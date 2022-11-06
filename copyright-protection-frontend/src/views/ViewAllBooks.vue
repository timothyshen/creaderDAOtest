<template>
  <el-row class="mt-3" :gutter="20">
    <el-col :span="12" :offset="6">
      <div>
        <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600">All books</h1>
      </div>
      <el-divider>

      </el-divider>
      <section class='flex flex-wrap justify-center'>
        <div class="w-1/4 mr-3 mb-4 bg-slate-100 rounded-md" v-for="cover in getCovers">
          <!--        <img class='w-full rounded-t-md' :key="nft.id" :src="nft.media[0].gateway">-->
          <img class='w-full rounded-t-md' :key="cover.id.toNumber()"
               src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                alt="cover"
          >
          <div class="p-3">
            <div class="flex mb-3">
              <div class="flex-grow">
                <h3 class="text-xl">{{ cover.title ? cover.title : "Test cover" }}</h3>
                <p>{{ sliceAddress(cover.owner) }}</p>
              </div>
              <div class="mr-2 mt-2">
                <span
                    class="px-4 py-2 rounded-full text-black bg-green-300 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
                      {{ cover.status ? cover.status : "Active" }}
                    </span>
              </div>
            </div>
            <p>{{
                cover.description ? cover.description.substring(0, 200) : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac condimentum dolor."
              }}</p>
            <button type="button"
                    @click="handleClick(cover.id.toNumber())"
                    class="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Read more
            </button>
          </div>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ViewAllBooks",
  computed: {
    ...mapGetters("cover", ["getCovers"])
  },
  created() {
    this.$store.dispatch("cover/getAllCover");
  },
  methods: {
    handleClick(id) {
      this.$router.push({
        name: "cover",
        params: {
          id: id
        }
      });
    },
    sliceAddress(address) {
      return address.slice(0, 6) + "...";
    },
  }
}
</script>

<style scoped>

</style>
