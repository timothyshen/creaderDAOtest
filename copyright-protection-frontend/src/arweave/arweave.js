import { initialize } from "./index";
import ArDB from "ardb";
import { cyrb53 } from "../utils/support.js";

const arweave = initialize();
const MIN_NUMBER_OF_CONFIRMATIONS = 2;

export const createArweaveTrans = async (data, ethAddress, bookTitle) => {
  try {
    const wallet = import.meta.env.VITE_ARWEAVE_API_KEY;
    const wallet_config = JSON.parse(wallet);
    const transaction = await arweave.createTransaction({
      data,
      wallet_config,
    });
    transaction.addTag("App-Name", import.meta.env.VITE_APP_NAME);
    bookTitle = cyrb53(bookTitle);
    transaction.addTag("Content-Type", "application/json");
    transaction.addTag("Address", ethAddress);
    transaction.addTag("Book-Title", bookTitle);
    await arweave.transactions.sign(transaction, wallet_config);
    const uploader = await arweave.transactions.getUploader(transaction);

    while (!uploader.isComplete) {
      await uploader.uploadChunk();
      console.log(
        `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
      );
    }
    console.log("Upload complete!");
    return { transaction: transaction.id, status: true };
  } catch (e) {
    console.error(e);
  }
};

export const getArweaveData = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const txDataResp = await arweave.transactions.getData(id, {
        decode: true,
        string: true,
      });
      const txData = JSON.parse(txDataResp);
      console.log(txData);
      const txStatusRes = await arweave.transactions.getStatus(id);
      console.log(txStatusRes);
      const txStatus =
        txStatusRes.status === 200 &&
        txStatusRes.confirmed &&
        txStatusRes.confirmed.number_of_confirmations >=
          MIN_NUMBER_OF_CONFIRMATIONS
          ? "confirmed"
          : "pending";
      console.log(txStatus);

      if (txStatus !== "confirmed") {
        reject("Transaction not confirmed");
      } else {
        const tx = await arweave.transactions.get(id);
        const tags = {};
        tx.get("tags").forEach((tag) => {
          const key = tag.get("name", { decode: true, string: true });
          tags[key] = tag.get("value", { decode: true, string: true });
        });

        const block = txStatusRes.confirmed
          ? await arweave.blocks.get(txStatusRes.confirmed.block_indep_hash)
          : null;
        console.log(block);
        const blockTime = block.timestamp;
        const txTimestamp = blockTime ? new Date(blockTime * 1000) : null;
        await resolve({
          id,
          data: txData,
          status: txStatus,
          timestamp: txTimestamp,
          tags,
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      reject(errorMessage);
    }
  });
};

const getData = async (txId) => {
  const buffer = await arweave.transactions.getData(txId, {
    decode: true,
    string: true,
  });
  return {
    transactionId: txId,
    buffer: JSON.parse(buffer),
  };
};

export const searchArweave = async (bookTitle, address = null) => {
  // TODO: if search fail it should return some data
  return new Promise(async (resolve, reject) => {
    try {
      console.log(bookTitle);
      const ardb = new ArDB(arweave);
      const tags = [
        { name: "App-Name", values: [import.meta.env.VITE_APP_NAME] },
      ];
      const searchAddress = address;
      bookTitle = cyrb53(bookTitle);
      bookTitle = bookTitle.toString();

      if (searchAddress) {
        tags.push({ name: "Address", values: [searchAddress] });
        console.log(tags);
      }
      tags.push({ name: "Book-Title", values: [bookTitle] });
      const txs = await ardb.search("transactions").tags(tags).find();
      const promises = txs.map((tx) => getData(tx._id));
      const data = await Promise.all(promises);

      resolve(data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown Error";
      await reject(errorMessage);
    }
  });
};
