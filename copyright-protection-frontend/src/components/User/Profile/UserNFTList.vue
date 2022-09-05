<template>
  <div class="px-4 py-5 sm:px-6">
    <h3 class="text-lg leading-6 font-medium text-gray-900">My NFTs</h3>
    <h4 class="leading-6 font-medium text-sm text-gray-500">Current holding:
      <span class="text-gray-900">{{ totalCount }}</span>
    </h4>
  </div>
  <div v-if="copyrightDetail || accessTokenDetail">
    <section class='flex flex-wrap justify-center'>

      <div class='flex flex-wrap justify-center'>
        <p class="text-lg leading-6 mb-3 font-medium text-gray-900">Copyright NFTs</p>
      </div>
      <el-divider class="w-3/4"></el-divider>
      <div class="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" v-for="nft in nftDetail">
        <!--        <img class='w-full rounded-t-md' :key="nft.id" :src="nft.media[0].gateway">-->
        <img class='w-full rounded-t-md' :key="nft.id"
             :src="nft.media[0].gateway"
            alt="Copyright NFT">
        <div class="p-3">
          <div class="flex mb-3">
            <div class="flex-grow">
              <h3 class="text-xl">{{ nft.title ? nft.title : "CreaderDAO" }}</h3>
              <p>{{ sliceString(nft.id.tokenId) }}</p>
            </div>
            <div class="flex mr-3">
              <a target="_blank" class="text-blue-700"
                 :href="formURL(nft.contract.address)">{{ sliceString(nft.contract.address) }}</a>
            </div>
          </div>
          <p>{{ nft.description ? nft.description.slice(0, 200) : "This is for book test" }}</p>
        </div>
      </div>
    </section>
    <section class='flex flex-wrap justify-center'>

      <h2 class="leading-6 font-medium text-lg text-gray-500">Accesstoken NFT</h2>
      <el-divider class="w-3/4"></el-divider>
      <div class="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" v-for="nft in accessTokenDetail">
        <!--        <img class='w-full rounded-t-md' :key="nft.id" :src="nft.media[0].gateway">-->
        <img class='w-full rounded-t-md' :key="nft.id"
             :src="nft.media[0].gateway"
             alt="Access right NFT">
        <div class="p-3">
          <div class="flex mb-3">
            <div class="flex-grow">
              <h3 class="text-xl">{{ nft.title ? nft.title : "CreaderDAO" }}</h3>
              <p>{{ sliceString(nft.id.tokenId) }}</p>
            </div>
            <div class="flex mr-3">
              <a target="_blank" class="text-blue-700"
                 :href="formURL(nft.contract.address)">{{ sliceString(nft.contract.address) }}</a>
            </div>
          </div>
          <p>{{ nft.description ? nft.description.slice(0, 200) : "This is for book test" }}</p>
        </div>
      </div>
    </section>
  </div>
  <div v-else>
    No NFTs found
  </div>

</template>

<script>
import {COPYRIGHT_NFT_CONTRACT_ADDRESS_POLY, ACCESS_TOKEN_CONTRACT_ADDRESS_POLY} from "../../../constant";
import {getAlchemy} from '../../../utils/alchemy.js';
import {mapGetters} from "vuex";

export default {
  name: "UserNFTList",
  components: {},
  data() {
    return {
      copyrightDetail: {},
      accessTokenDetail: {},
      totalCount: 0,
    };
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount"]),
  },
  created() {
    this.fetchCopyrightNFTs();
    this.fetchAccessToken();
  },
  methods: {
    async fetchCopyrightNFTs() {
      const nfts = await getAlchemy(this.getActiveAccount, COPYRIGHT_NFT_CONTRACT_ADDRESS_POLY);
      this.nftDetail = nfts.ownedNfts;
      this.totalCount = nfts.totalCount;

    },
    async fetchAccessToken() {
      const nfts = await getAlchemy(this.getActiveAccount, ACCESS_TOKEN_CONTRACT_ADDRESS_POLY);
      this.accessTokenDetail = nfts.ownedNfts;
      this.accessTokenDetail.forEach(nft => {
        let tokenId = nft.id.tokenId;
        this.$store.dispatch("accessToken/addTokentoHolding", tokenId);
      });
      console.log(this.accessTokenDetail);
      this.totalCount += nfts.totalCount;
    },
    sliceString(string) {
      return string.slice(0, 4) + "..." + string.slice(string.length - 4);
    },
    formURL(string) {
      return "https://rinkeby.etherscan.io/token/" + string;
    },
  },
}
</script>

<style scoped>

</style>
