import { Contract, providers } from "ethers";
import {COPY_RIGHT_CONTRACT_ABI, COPY_RIGHT_CONTRACT_ADDRESS} from "../constants";
import store from "../store/store";

export const getCopyrightContract = async (providerOrSigner) => {
    return new Contract(
        COPY_RIGHT_CONTRACT_ADDRESS,
        COPY_RIGHT_CONTRACT_ABI,
        providerOrSigner
    );
}

export const getProviderOrSigner = async (needSigner = false) => {
    console.log(store.state.wallet.web3Modal);
    const provider = await store.state.wallet.web3Modal.connect();
    const Web3Provider = new providers.Web3Provider(provider);
    console.log(provider);
    const {chainId} = await Web3Provider.getNetwork();
    if (chainId !== 4) {
        window.alert("Please connect to the Rinkeby test network");
        throw new Error("Only Ethereum Rinkeby test network is supported");
    }
    if (needSigner) {
        return provider.getSigner();
    }
    return provider;
}
