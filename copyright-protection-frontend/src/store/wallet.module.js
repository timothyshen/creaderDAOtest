// This is the wallet connection module. It will be used to connect the wallet to the application.

import {ethers} from "ethers";


const state = {
    activeAccount: null,
    activeBalance: 0,
    chainId: null,
    chainName: null,
    web3: null,
    isConnected: false,
    providerW3m: null, // this is "provider" from Web3Modal
    web3Modal: null
};

const getters = {
    getActiveAccount(state) {
        if (!state.activeAccount) {
            return window.ethereum.selectedAddress;
        }

        return state.activeAccount;
    },
    getActive(state) {
        if (state.web3) {
            return state.web3;
        } else {
            return new ethers.providers.Web3Provider(ethers.providers.Web3Provider.givenProvider);
        }
    },
    getChainId(state) {
        return state.chainId;
    },
    getChainName(state) {
        return state.chainName;
    },
    getActiveBalance(state) {
        return state.web3.utils.fromWei(state.activeBalance, 'ether');
    },
    getWeb3Modal(state) {
        return state.web3Modal;
    },
    getIsConnected(state) {
        return state.isConnected;
    }
};

const actions = {
    async initWeb3Modal({commit}) {
        const providerOptions = {
            walletconnect: {
                package: 'walletconnect-v1',
                options: {
                    infuraId: "INFURA_ID" // required
                }
            },
            coinbasewallet: {
                package: CoinbaseWalletSDK, // Required
                options: {
                    appName: "My Awesome App", // Required
                    infuraId: "INFURA_ID", // Required
                    rpc: "", // Optional if `infuraId` is provided; otherwise it's required
                    chainId: 1, // Optional. It defaults to 1 if not provided
                    darkMode: false // Optional. Use dark theme, defaults to false
                }
            }
        };

        const w3mObject = new Web3Modal({
            providerOptions,
            cacheProvider: true,
        });

        window.ethereum.autoRefreshOnNetworkChange = false;

        if (localStorage.getItem('isConnected') === 'true') {
            let providerW3m = await w3mObject.connect();
            commit('setIsConnected', true);
            commit('setActiveAccount', window.ethereum.selectedAddress);
            commit('setChainId', window.ethereum.chainId);
            commit('setWeb3Provider', providerW3m);
            actions.fetchActiveBalance({commit});
        }
    },

    async connectWeb3Modal({commit}) {
        let providerW3m = await state.web3Modal.connect();
        commit('setIsConnected', true);

        commit('setActiveAccount', window.ethereum.selectedAddress);
        commit('setChainId', window.ethereum.chainId);
        commit('setWeb3Provider', providerW3m);
        actions.fetchActiveBalance({commit});
    },

    async disconnectWeb3Modal({commit}) {
        commit('disconnectWallet');
        commit('setIsConnected', false);
    },

    async ethereumListener({commit}) {

        window.ethereum.on('accountsChanged', (accounts) => {
            if (state.isConnected) {
                commit("setActiveAccount", accounts[0]);
                commit("setWeb3Provider", state.providerW3m);
                actions.fetchActiveBalance({commit});
            }
        });

        window.ethereum.on('chainChanged', (chainId) => {
            commit("setChainData", chainId);
            commit("setWeb3Provider", state.providerW3m);
            actions.fetchActiveBalance({commit});
        });

    },

    async fetchActiveBalance({commit}) {
        let activeAccount = state.activeAccount;
        let web3 = state.web3;
        let balance = await web3.eth.getBalance(activeAccount);
        commit('setActiveBalance', balance);
    }
}

const mutations = {
    async disconnectWallet(state) {
        state.activeAccount = null;
        state.activeBalance = 0;
        state.web3 = null;
        if (state.providerW3m.close) {
            await state.providerW3m.close();
        }
        state.providerW3m = null;
        await state.web3Modal.clearCachedProvider();

        window.location.href = '../'; // redirect to the Main page
    },

    setActiveAccount(state, selectedAddress) {
        state.activeAccount = selectedAddress;
    },

    setActiveBalance(state, balance) {
        state.activeBalance = balance;
    },

    setChainData(state, chainId) {
        state.chainId = chainId;

        switch(chainId) {
            case "0x1":
                state.chainName = "Mainnet";
                break;
            case "0x2a":
                state.chainName = "Kovan";
                break;
            case "0x3":
                state.chainName = "Ropsten";
                break;
            case "0x4":
                state.chainName = "Rinkeby";
                break;
            case "0x5":
                state.chainName = "Goerli";
                break;
            case "0x539": // 1337 (often used on localhost)
            case "0x1691": // 5777 (default in Ganache)
            default:
                state.chainName = "Localhost";
                break;
        }
    },

    async setWeb3Provider(state, providerW3m) {
        state.providerW3m = providerW3m;
        state.web3 = new Web3(providerW3m);
    },

    setIsConnected(state, isConnected) {
        state.isConnected = isConnected;
        // add to persistent storage so that the user can be logged back in when revisiting website
        localStorage.setItem('isConnected', isConnected);
    },

    setWeb3ModalInstance(state, w3mObject) {
        state.web3Modal = w3mObject;
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
