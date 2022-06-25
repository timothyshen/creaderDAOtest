import { Contract, providers } from "ethers";
import {COPY_RIGHT_CONTRACT_ABI, COPY_RIGHT_CONTRACT_ADDRESS} from "../constants";
import store from "../store/store";

export const getCopyrightContract = (providerOrSigner) => {
    // console.log("provider-contract", providerOrSigner);
    // console.log("COPY_RIGHT_CONTRACT_ADDRESS", COPY_RIGHT_CONTRACT_ADDRESS);
    // console.log("abi", COPY_RIGHT_CONTRACT_ABI);
    return new Contract(
        COPY_RIGHT_CONTRACT_ADDRESS,
        COPY_RIGHT_CONTRACT_ABI,
        providerOrSigner
    );
}

export const getProviderOrSigner = async (needSigner = false) => {
    console.log(store.state.wallet.web3Modal)
    const provider = await store.state.wallet.web3Modal.connect();
    const Web3Provider = new providers.Web3Provider(provider);
    console.log(Web3Provider);
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
