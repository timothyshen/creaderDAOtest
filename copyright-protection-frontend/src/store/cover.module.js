import {ethers} from "ethers";
import {getCopyrightNFTContract, getProviderOrSigner} from "../utils/support";


const state = {
    numberOfCovers: 0,
    covers: [],
    authorCovers: [],
    cover: {},
    loading: false,
}

const getters = {
    getNumberOfCovers(state) {
        return state.numberOfCovers;
    },
    getCovers(state) {
        return state.covers;
    },
    getAuthorCovers(state) {
        return state.authorCovers;
    },
    getLoading(state) {
        return state.loading;
    },
    getCover(state) {
        return state.cover;
    }
}

const actions = {
    async getAllCover({commit}) {
        try {
            const { ethereum } = window;
            const provider = await new ethers.providers.Web3Provider(ethereum);
            const contract = getCopyrightNFTContract(provider);
            const cover = await contract.getAllCoypright();
            commit("setCovers", cover);

        } catch (error) {
            console.log(error);
        }
    },
    async getCoverNum({commit}) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getCopyrightNFTContract(provider);
            const number = await contract.nextCoverId();
            commit("setNumberOfCovers", number.toString());
        } catch (error) {
            console.log(error);
        }
    },
    async getAuthorCover({commit}) {
        try {
            const signer = await getProviderOrSigner(true);
            // console.log(signer);
            const contract = getCopyrightNFTContract(signer);
            // console.log(contract);
            const cover = await contract.getAuthorCover();
            // console.log(cover);
            commit("setAuthorCovers", cover);
        } catch (error) {
            console.log(error);
        }
    },
    async getSpecicCover({commit}, id) {
      try {
        const provider = await getProviderOrSigner();
        const contract = getCopyrightNFTContract(provider);
        const cover = await contract.covers(id);
        commit("setCover", cover);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchNFT({commit}) {
      try {
        const provider = await getProviderOrSigner();
        const contract = getCopyrightNFTContract(provider);
        return await contract.fetchUserNFT()
      } catch (error) {
        console.log(error);
      }
    },
    async getCoverByTokenId({commit}, id) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getCopyrightNFTContract(provider);
            const cover = await contract.getCoverByToken(id);
            commit("setCover", cover);
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
    },
    setCover(state, cover) {
        state.cover = cover;
    }
}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
