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
