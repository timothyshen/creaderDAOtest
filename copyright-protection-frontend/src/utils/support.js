import { Contract, providers } from "ethers";
import * as constant from "../constant";
import store from "../store/store";

export const getCopyrightNFTContract = (providerOrSigner) => {
    /*
    * To get the contract instance for Copyright NFT
    * @param providerOrSigner: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | ethers.providers.WebSocketProvider | ethers.Signer
    * @return: ethers.Contract
     */
    return new Contract(
        constant.COPYRIGHT_NFT_CONTRACT_ADDRESS_POLY,
        constant.COPYRIGHT_NFT_CONTRACT_ABI_POLY,
        providerOrSigner
    );
}

export const getCopyrightNFTContract_poly = (providerOrSigner) => {
    /*
    * To get the contract instance for Copyright NFT for Polygon
    * @param providerOrSigner: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | ethers.providers.WebSocketProvider | ethers.Signer
    * @return: ethers.Contract
     */
    return new Contract(
        constant.COPYRIGHT_NFT_CONTRACT_ADDRESS_POLY,
        constant.COPYRIGHT_NFT_CONTRACT_ABI_POLY,
        providerOrSigner
    );
}

export const getAccessTokenContract = (providerOrSigner) => {
    /*
    * To get the contract instance for Access Token for Polygon
    * @param providerOrSigner: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | ethers.providers.WebSocketProvider | ethers.Signer
    * @return: ethers.Contract
     */
    return new Contract(
        constant.ACCESS_TOKEN_CONTRACT_ADDRESS_POLY,
        constant.ACCESS_TOKEN_CONTRACT_ABI_POLY,
        providerOrSigner
    );
}


export const getProviderOrSigner = async (needSigner = false) => {
    /*
    * To get the provider or signer instance
    * @param needSigner: boolean
    * @return: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider | ethers.providers.WebSocketProvider | ethers.Signer
     */
    const provider = await store.state.wallet.web3Modal.connect();
    const Web3Provider = new providers.Web3Provider(provider);
    const {chainId} = await Web3Provider.getNetwork();
    if (chainId !== 80001) {
        window.alert("Please connect to the Mumbai test network");
        throw new Error("Only Ethereum Mumbai test network is supported");
    }
    if (needSigner) {
        return Web3Provider.getSigner();
    }
    return Web3Provider;
}

export const chainSwitch = async () => {
    /*
    * To switch the chain to Polygon Mumbai test network
     */
    try {
        const ethereum = window.ethereum;
        await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }],
        });
    } catch (error) {
        console.error(error);
    }
}

export const cyrb53 = function(str, seed = 0) {
    /*
    * To generate a hash value for a string
    * @param str: string
    * @param seed: number
    * @return: number
     */
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
