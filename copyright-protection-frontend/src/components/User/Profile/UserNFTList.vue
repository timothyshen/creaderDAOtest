<template>
  <el-row>
    <el-col>
      <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">My NFTs</h2>
      <section className='flex flex-wrap justify-center'>
        <div v-if>
          <NFTDetailCard :nftDetail="nftDetail"></NFTDetailCard>
        </div>
        <div v-else>No NFTs found</div>
      </section>

    </el-col>
  </el-row>
</template>

<script>
import {COPYRIGHT_NFT_CONTRACT_ADDRESS} from "../../../constant";
import {fetchNFTs} from '../../../utils/alchemy.js';
import NFTDetailCard from './NFTDetailCard.vue'
export default {
  name: "UserNFTList",
  components: {NFTDetailCard},
  data() {
    return {
      nftDetail: {},
    };
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount"]),
  },
  mounted() {
    fetchNFTs(this.getActiveAccount,COPYRIGHT_NFT_CONTRACT_ADDRESS).then(res => {
      this.nftDetail = res;
    }).catch(err => {
      this.$message.error(err);
    }).finally(() => {
      this.$loading.finish();
    });
  },
}
</script>

<style scoped>

</style>
