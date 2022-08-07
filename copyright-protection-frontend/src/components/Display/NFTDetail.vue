<template>
  <div v-if="getAccessToken">
    <div>Total Supply</div>
    <div>{{ getAccessToken.numSold }} / {{ getAccessToken.quantity }}</div>
<!--    <div>{{ this.weiToEther()}} ETH</div>-->
    <el-button :loading="loading" @click="mintNFT">{{ mint }}</el-button>
  </div>
</template>

<script>
import {ethers} from "ethers";
import {mapGetters} from "vuex";
import {getProviderOrSigner, getAccessTokenContract} from "../../utils/support.js";

export default {
  name: "NFTDetail",
  data() {
    return {
      loading: false,
      mint: 'mint'
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3", "getWeb3Modal"]),
    ...mapGetters("accessToken", ["getAccessToken"]),
    ...mapGetters("cover", ["getCover"]),
  },
  created() {
    if (!this.getActiveAccount) {
      this.mint = "Connect Your Wallet!";
    } else {
      this.$store.dispatch("accessToken/retrieveAccessToken", this.$route.params.id);
      // if (this.getAccessToken.id !== 0) {
      //   this.weiToEther();
      // }
    }
  },
  methods: {
    weiToEther() {
      let wie = ethers.BigNumber.from(this.getAccessToken.price);
      return ethers.utils.formatEther(wie);
    },
    async mintNFT() {
      try {
        this.loading = true;
        const signer = await getProviderOrSigner(true);
        const accessTokenContract = await getAccessTokenContract(signer);
        const txn = await accessTokenContract.buyMembership(
            this.getAccessToken.id,
            this.getCover.title,
            {
              from: this.getActiveAccount,
              gasLimit: 1000000,
              value: ethers.utils.parseEther("0.01")
            }
        )
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
