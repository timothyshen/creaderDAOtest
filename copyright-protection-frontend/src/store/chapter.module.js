import {
    getCopyrightContract, getCopyrightNFTContract,
    getProviderOrSigner
} from "../utils/support";

const state = {
    numberOfChapter: 0,
    chapters: [],
    chapter: {},
    loading: false,
}

const getters = {
    getNumberOfChapter(state) {
        return state.numberOfChapter;
    },
    getChapters(state) {
        return state.chapters;
    },
    getChapter(state) {
        return state.chapter;
    },
    getLoading(state) {
        return state.loading;
    }
}

const actions = {
    async retrieveChapter({commit}, id) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getCopyrightNFTContract(provider);
            const chapters = await contract.getChapters(id);
            commit("setChapter", chapters);
        } catch (error) {
            console.log(error);
        }
    },
     async getSpecificChapter({commit}, id) {
        try {
            const provider = await getProviderOrSigner();
            const contract = getCopyrightNFTContract(provider);
            const chapter = await contract.getChapter(id);
            commit("setChapter", chapter);
        } catch (error) {
            console.log(error);
        }
    }
}

const mutations = {
    setNumberOfChapter(state, numberOfChapter) {
        state.numberOfChapter = numberOfChapter;
    },
    setChapters(state, chapters) {
        state.chapters = chapters;
    },
    setChapter(state, chapter) {
        state.chapter = chapter;
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
