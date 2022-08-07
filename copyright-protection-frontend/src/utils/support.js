import { Contract, providers } from "ethers";
import * as constant from "../constant";
import store from "../store/store";

export const getCopyrightContract = (providerOrSigner) => {
    return new Contract(
        constant.COPY_RIGHT_CONTRACT_ADDRESS,
        constant.COPY_RIGHT_CONTRACT_ABI,
        providerOrSigner
    );
}

export const getCopyrightNFTContract = (providerOrSigner) => {
    return new Contract(
        constant.COPYRIGHT_NFT_CONTRACT_ADDRESS,
        constant.COPYRIGHT_NFT_CONTRACT_ABI,
        providerOrSigner
    );
}

export const getAccessTokenContract = (providerOrSigner) => {
    return new Contract(
        constant.ACCESS_TOKEN_CONTRACT_ADDRESS,
        constant.ACCESS_TOKEN_CONTRACT_ABI,
        providerOrSigner
    );
}

export const getProviderOrSigner = async (needSigner = false) => {
    const provider = await store.state.wallet.web3Modal.connect();
    const Web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await Web3Provider.getNetwork();
    if (chainId !== 4) {
        window.alert("Please connect to the Rinkeby test network");
        throw new Error("Only Ethereum Rinkeby test network is supported");
    }
    if (needSigner) {
        return Web3Provider.getSigner();
    }
    return Web3Provider;
}

export const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};
