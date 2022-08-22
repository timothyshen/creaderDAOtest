<template>
<section class="flex flex-wrap justify-center">
  <div class="w-3/4 m-4 h-60 bg-indigo-50 rounded-3xl">
    <div v-if="getAccessToken.quantity > 1" class="top-10 text-center m-4">
      <div>Total Supply</div>
      <div>{{ getAccessToken.numSold }} / {{ getAccessToken.quantity }}</div>
      <div>{{ this.weiToEther()}} Matic</div>
      <el-button :loading="loading" @click="mintNFT(this.weiToEther())">{{ mint }}</el-button>
    </div>
  </div>

</section>

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
    async mintNFT(price) {
      try {
        this.loading = true;
        const signer = await getProviderOrSigner(true);
        const accessTokenContract = await getAccessTokenContract(signer);
        const txn = await accessTokenContract.buyMembership(
            this.getAccessToken.id,
            {
              from: this.getActiveAccount,
              value: ethers.utils.parseEther(price)
            }
        )
        await txn.wait();
        this.$message({
          message: "Mint Success!",
          type: "success"
        });
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    }
  }
}
</script>

<style scoped>

</style>
