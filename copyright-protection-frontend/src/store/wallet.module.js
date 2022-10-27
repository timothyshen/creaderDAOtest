// This is the wallet connection module. It will be used to connect the wallet to the application.

import {ethers} from "ethers";
import Web3Modal from "web3modal";


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
    getActiveBalanceWei(state) {
        return state.activeBalance;
    },
    getActiveBalanceEth(state) {
        return state.web3.utils.fromWei(state.activeBalance, "ether");
    },
    getWeb3(state) {
        if (state.web3) {
            return state.web3;
        } else {
            const EthereumProvider = new ethers.providers.Web3Provider(window.ethereum);
            return EthereumProvider.provider;
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
        const providerOptions = {};

        const web3Modal = new Web3Modal({
            network: "rinkeby",
            providerOptions,
            disableInjectedProvider: false,
        });

        if (localStorage.getItem('isConnected') === 'true') {
            let providerW3m = await web3Modal.connect();
            let provider = new ethers.providers.Web3Provider(providerW3m);
            commit('setIsConnected', true);
            commit('setActiveAccount', window.ethereum.selectedAddress);
            commit('setChainData', window.ethereum.chainId);
            commit('setWeb3Provider', provider);
            actions.fetchActiveBalance({commit});
        }
        commit("setWeb3Modal", web3Modal);
    },

    async connectWeb3Modal({commit}) {
        let providerW3m = await state.web3Modal.connect();
        let provider = new ethers.providers.Web3Provider(providerW3m);
        commit('setIsConnected', true);
        commit('setActiveAccount', window.ethereum.selectedAddress);
        commit('setChainData', window.ethereum.chainId);
        commit('setWeb3Provider', provider);
    },

    async disconnectWeb3Modal({commit}) {
        commit('disconnectWallet');
        commit('setIsConnected', false);
    },

    async ethereumListener({commit}) {

        window.ethereum.on('accountsChanged', (accounts) => {
            if (state.isConnected) {
                let provider = new ethers.providers.Web3Provider(state.providerW3m);
                commit("setActiveAccount", accounts[0]);
                commit("setWeb3Provider", provider);
                actions.fetchActiveBalance({commit});
            }
        });

        window.ethereum.on('chainChanged', (chainId) => {
            let provider = new ethers.providers.Web3Provider(state.providerW3m);
            commit("setChainData", chainId);
            commit("setWeb3Provider", provider);
            actions.fetchActiveBalance({commit});
        });

    },

    async fetchActiveBalance({commit}) {
        let balance_eth = await state.providerW3m.getBalance(state.activeAccount);
        let balance_wei = ethers.utils.formatEther(balance_eth);
        commit('setActiveBalance', balance_wei);
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

        window.location.href = '/'; // redirect to the Main page
    },

    setActiveAccount(state, selectedAddress) {
        state.activeAccount = selectedAddress;
    },

    setActiveBalance(state, balance) {
        state.activeBalance = balance;
    },

    setChainData(state, chainId) {
        state.chainId = chainId;

        switch (chainId) {
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
            case "0x13881":
                state.chainName = "Mumbai";
                break;
        }
    },

    async setWeb3Provider(state, providerW3m) {
        state.providerW3m = providerW3m;
        const EthereumProvider = new ethers.providers.Web3Provider(window.ethereum);
        state.web3 = EthereumProvider.provider;
    },

    setIsConnected(state, isConnected) {
        state.isConnected = isConnected;
        // add to persistent storage so that the user can be logged back in when revisiting website
        localStorage.setItem('isConnected', isConnected);
    },

    setWeb3Modal(state, web3Modal) {
        state.web3Modal = web3Modal;
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
