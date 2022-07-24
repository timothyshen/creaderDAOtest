import {ethers} from "ethers";
import {
    getCopyrightContract,
    getProviderOrSigner
} from "../utils/support";


const state = {
    numberOfCovers: 0,
    covers: [],
    authorCovers: [],
    loading: false,
}

const getters = {
    getNumberOfCovers(state) {
        return state.numberOfCovers;
    },
    getCover(state) {
        return state.covers;
    },
    getAuthorCovers(state) {
        return state.authorCovers;
    },
    getLoading(state) {
        return state.loading;
    }
}

const actions = {
    async getCovers({commit}) {
        try {
            const { ethereum } = window;
            const provider = await new ethers.providers.Web3Provider(ethereum);
            // const provider = await getProviderOrSigner();
            const contract = getCopyrightContract(provider);
            const cover = await contract.getAllCoypright();

            commit("setCovers", cover);

        } catch (error) {
            console.log(error);
        }
    },
    async getCoverNum({commit}) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getCopyrightContract(provider);
            const number = await contract.numCovers();
            commit("setNumberOfCovers", number.toString());
        } catch (error) {
            console.log(error);
        }
    },
    async getAuthorCover({commit}) {
        try {
            const signer = await getProviderOrSigner(true);
            const contract = getCopyrightContract(signer);
            const cover = await contract.getAuthorCover();
            commit("setAuthorCovers", cover);
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
    },
    setAuthorCovers(state, authorCovers) {
        state.authorCovers = authorCovers;
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
