// This is the wallet connection module. It will be used to connect the wallet to the application.


export const WALLET_ADDRESS = 'walletAddress';

//Actions for vuex store
export const CONNECT_WALLET = 'connectWallet';

//Setters for vuex store
export const SET_WALLET = 'setWallet';
export const SET_PROVIDER = 'setProvider';

//Getters for vuex store
export const GET_WALLET_SHORT_ADDRESS = 'getWalletShortAddress';
export const GET_ACTIVE = 'getActive';
export const GET_ACCOUNT = 'getAccount';
export const GET_CHAIN_ID = 'getChainId';

const state = {
    wallet: {
        message: '',
        metaMaskAddress: '',
        netID: -1,

    }
}
