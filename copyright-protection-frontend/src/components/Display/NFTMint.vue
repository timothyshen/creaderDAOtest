<template>
  <div>
    <div>Total Supply</div>
    <el-button :click="mintMyPass" :loading="loading">{{ mint }}</el-button>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {getAccessTokenContract, getProviderOrSigner} from "../../utils/support";

export default {
  name: "NFTMint",
  data() {
    return {
      loading: false,
      mint: 'mint'
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3", "getWeb3Modal"]),
    ...mapGetters("chapter", ["getChapter", "getLoading"]),
  },
  created() {

  },
  methods: {
    async mintMyPass() {

    }
  },
  watch: {
    mint() {
      if (!this.getActiveAccount){
        this.mint= "Connect Your Wallet!";
      }
    }
  }
}
</script>

<style scoped>

</style>
