import {
    getAccessTokenContract,
    getProviderOrSigner
} from "../utils/support";

const state = {
    accessToken: {},
    numberOfToken: 0,
    quantity: 0,
    currentHolding: {},
    tokenURI: "",
    balanceOf: 0,
}

const getters = {
    getAccessToken(state) {
        return state.accessToken;
    },
    getNumberOfToken(state) {
        return state.numberOfToken;
    },
    getQuantity(state) {
        return state.quantity;
    },
    getCurrentHolding(state) {
        return state.currentHolding;
    },
    getTokenURI(state) {
        return state.tokenURI;
    },
    getBalanceOf(state) {
        return state.balanceOf;
    }
}

const actions = {
    async retrieveAccessToken({commit}, id) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getAccessTokenContract(provider);
            const accessToken = await contract.getMembership(0);
            commit("setAccessToken", accessToken);
        } catch (error) {
            console.log(error);
        }
    },
    async balanceOfUser({commit}, address) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getAccessTokenContract(provider);
            const balanceOf = await contract.balanceOf(address);
            commit("setBalanceOf", balanceOf);
        } catch (error) {
            console.log(error);
        }
    },
    async retrieveQuantity({commit}, id) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getAccessTokenContract(provider);
            const quantity = await contract.totalSupply(id);
            commit("setQuantity", quantity);
        } catch (error) {
            console.log(error);
        }
    }
}

const mutations = {
    setAccessToken(state, accessToken) {
        state.accessToken = accessToken;
    },
    setNumberOfToken(state, numberOfToken) {
        state.numberOfToken = numberOfToken;
    },
    setQuantity(state, quantity) {
        state.quantity = quantity;
    },
    setCurrentHolding(state, currentHolding) {
        state.currentHolding = currentHolding;
    },
    setTokenURI(state, tokenURI) {
        state.tokenURI = tokenURI;
    },
    setBalanceOf(state, balanceOf) {
        state.balanceOf = balanceOf;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
