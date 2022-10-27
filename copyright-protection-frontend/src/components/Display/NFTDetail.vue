<template>
  <!--TODO: reformate the style-->
<section class="flex flex-wrap justify-center">
  <div v-if="getAccessToken.quantity > 1" class="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
    <h3 class="mb-4 text-2xl font-semibold">Mint</h3>
    <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Purchase your Subscription pass Now!</p>
    <div class="flex justify-center items-baseline mt-4">
      <p class="mr-6">Price:</p>
      <div>
        <p class=" text-3xl font-extrabold">{{ this.weiToEther()}}
        <span class="text-sm text-gray-500 dark:text-gray-400">Matic</span></p>
      </div>
    </div>
    <div class="flex justify-center items-baseline mb-4">
      <p class="mr-6 text-left">Supply:</p>
      <div>
        <p class="my-4 text-center text-3xl text-gray-500 leading-normal">{{ getAccessToken.numSold }} / {{ getAccessToken.quantity }}</p>
      </div>
    </div>

    <!-- List -->
    <ul role="list" class="mb-8 space-y-4 text-left">
      <li class="flex items-center space-x-3">
        <!-- Icon -->
        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        <span>Full access to the book</span>
      </li>
      <li class="flex items-center space-x-3">
        <!-- Icon -->
        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        <span>Physical Airdrop</span>
      </li>
      <li class="flex items-center space-x-3">
        <!-- Icon -->
        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        <span>Share of revenue <span class="font-semibold">20%</span></span>
      </li>
      <li class="flex items-center space-x-3">
        <!-- Icon -->
        <svg class="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
        <span>Ownership rights: <span class="font-semibold">Forever</span></span>
      </li>
    </ul>
    <el-button class="inline-block rounded-md bg-red-500 px-10 py-2 font-semibold text-red-100 shadow-md duration-75 hover:bg-red-400 hover:text-white" :loading="loading" @click="mintNFT(this.weiToEther())">{{ mint }}</el-button>
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
      mint: 'Mint Now'
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
