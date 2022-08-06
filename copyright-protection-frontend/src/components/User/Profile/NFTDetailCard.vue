<template>
  <div class="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" >
    <img class='w-full rounded-t-md' :key="nftDetail.id.tokenId" :src="nftDetail.media[0].gateway"></img>
    <div class="p-3">
      <div class="flex mb-3">
        <div class="flex-grow">
          <h3 class="text-xl">{{ nftDetail.title }}</h3>
          <p>{{ sliceId(nftDetail.id) }}</p>
        </div>
        <div class="flex mr-3">
          <a target="_blank" class="text-blue-700" :href=`https://etherscan.io/token/${nftDetial.contract.address}`>{{ stringForSlice(nftDetial.contract.address) }}</a>
        </div>
      </div>
      <p>{{ nftDetail.description ? nftDetail.description.slice(0, 200) : "No Description" }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NFTDetailCard",
  prop: ["nftDetail"],
  computed: {
    sliceId(stringForSlice) {
      return stringForSlice.substring(0, 4) + "..." + stringForSlice.substring(stringForSlice.length - 4);
    }
  },
}
</script>

<style scoped>

</style>
