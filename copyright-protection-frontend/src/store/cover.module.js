import {Contract, providers} from "ethers";
import store from "./store";
import {
    getCopyrightContract,
    getProviderOrSigner
} from "../utils/support";

import {
    COPY_RIGHT_CONTRACT_ADDRESS,
    COPY_RIGHT_CONTRACT_ABI
} from "../constants";


const state = {
    numberOfCovers: 0,
    covers: [],
    loading: false,
}

const getters = {
    getNumberOfCovers(state) {
        return state.numberOfCovers;
    },
    getCover(state) {
        return state.covers;
    },
    getLoading(state) {
        return state.loading;
    }
}

const actions = {
    async getCovers({commit, rootState}) {
        try {
            // console.log(rootState.wallet.web3Modal);
            const provider = await getProviderOrSigner(false, rootState.wallet.web3Modal);
            const contract = getCopyrightContract(provider);

        } catch (error) {
            console.log(error);
        }
    },
    async getCoverNum({commit}) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getCopyrightContract(provider);
            console.log("contract", contract);
            const number = contract.numCovers;
            console.log("number", number);
        } catch (error) {
            console.log(error);
        }
    }
}

const mutations = {
    setNumberOfCovers(state, numberOfCovers) {
        state.numberOfCovers = numberOfCovers;
    },
    setCovers(state, covers) {
        state.covers = covers;
    },
    setLoading(state, loading) {
        state.loading = loading;
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
