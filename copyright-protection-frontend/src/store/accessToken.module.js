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
    isOwner: false,
}

const getters = {

    getAccessToken(state) {
        /*
        * @dev: get access token
         */
        return state.accessToken;
    },
    getNumberOfToken(state) {
        /*
        * @dev: get number of token
         */
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
    },
    getIsOwner(state) {
        return state.isOwner;
    }
}

const actions = {
    async retrieveAccessToken({commit}, id) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getAccessTokenContract(provider);
            const accessToken = await contract.getMembership(id);
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
    },
    async isMembership({commit}, coverId, tokenId) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getAccessTokenContract(provider);
            const isMembership = await contract.checkOwnership(coverId, tokenId);
            commit("setIsOwner", isMembership);
        } catch (error) {
            console.log(error);
        }
    },
    addTokentoHolding({commit}, tokenId) {
        commit("setCurrentHolding", tokenId);
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
    },
    setIsOwner(state, isOwner) {
        state.isOwner = isOwner;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
