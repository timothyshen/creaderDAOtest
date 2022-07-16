import {initialize} from 'lib/arweave';

const arweave = initialize();
const MIN_NUMBER_OF_CONFIRMATIONS = 2;

const TransactionStatusE = {
    CONFIRMED: 1,
    NOT_CONFIRMED: 0,

}

export const initArweave = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const wallet = await JSON.parse(process.env.ARWEAVE_WALLET);
            const transaction = await arweave.createTransaction({
                data: data,
                wallet
            });
            transaction.addTag('App-Name', process.env.APP_NAME);
            transaction.addTag('Content-Type', 'application/json');
            transaction.addTag('Address', address);

            await arweave.transactions.sign(transaction, wallet);
            await arweave.transactions.post(transaction);
            return resolve(transaction.id);
        } catch (e) {
            console.error(e);
        }
    });

}

export const getArweaveData = async (id) => {
    return new Promise(async (resolve, reject) => {
        try {

            const txDataResp = (await arweave.transactions.getData(
                id,
                {
                    decode: true,
                    string: true,
                },
            ));
            const txData = JSON.parse(txDataResp);

            const txStatusResp = await arweave.transactions.getStatus(
                id,
            );
            const txStatus =
                txStatusResp.status === 200 &&
                txStatusResp.confirmed &&
                txStatusResp.confirmed.number_of_confirmations >=
                MIN_NUMBER_OF_CONFIRMATIONS
                    ? TransactionStatusE.CONFIRMED
                    : TransactionStatusE.NOT_CONFIRMED;

            if (txStatus === TransactionStatusE.CONFIRMED) {
                const tx = await arweave.transactions.get(id);

                const tags = {};
                (tx.get('tags')
                ).forEach((tag) => {
                    const key = tag.get('name', {decode: true, string: true});
                    tags[key] = tag.get('value', {decode: true, string: true});
                });

                const block = txStatusResp.confirmed
                    ? await arweave.blocks.get(txStatusResp.confirmed.block_indep_hash)
                    : null;

                await resolve.status(200).json({
                    id: id,
                    data: txData,
                    status: txStatus,
                    timestamp: block?.timestamp,
                    tags,
                });
            } else {
                throw new Error('Transaction not confirmed');
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Unknown Error";
            await reject(errorMessage);
        }
    });
}

const getData = async (txId) => {
    const buffer = (await arweave.transactions.getData(txId, {
        decode: true,
        string: true,
    }));
    return {
        transactionId: txId,
        buffer: JSON.parse(buffer),
    };
};

const searchArweave = async (query) => {
  return new Promise(async (resolve, reject) => {
     try {
         const {query} = request.query;
         const ardb = new ArDB(arweave);
         const tags = [{name: 'App-Name', values: [process.env.APP_NAME]}];
         const searchAddress = query && query[0];
         if (searchAddress) {
             tags.push({name: 'Address', values: [searchAddress]});
         }
         const txs = await ardb.search('transactions').tags(tags).limit(10).find();

         const promises = txs.map((tx) => getData(tx._id));
         const data = await Promise.all(promises);

         await res.status(200).json(data);
     } catch (error) {
         const errorMessage =
             error instanceof Error ? error.message : "Unknown Error";
         await rejecstt(errorMessage);
     }
  });
};

