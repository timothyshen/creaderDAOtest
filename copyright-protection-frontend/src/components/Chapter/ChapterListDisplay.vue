<template>
  <el-row :gutter="20">
    <el-col>
      <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black text-left ">{{ getCover.title }}</h2>
      <el-divider></el-divider>
      <div v-if="this.chapters.length > 0 && isloading !== true">
        <el-row class="grid-content bg-amber-100 h-20 leading-15 rounded-3xl pt-5" :gutter="20" v-for="chapter in chapters">
          <el-col :span="8">
            <span class="item-span text-left">Cover title</span>
            <h3 class="item-content">{{ chapter.buffer.title }}</h3>
          </el-col>
          <el-col :span="8">
            <span class="item-span">Transaction ID</span>
            <h3 class="item-content">{{ chapter.transactionId.substring(0,7) }}</h3>
          </el-col>
          <el-col class="item-button-group" :span="8">

            <button type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Edit
            </button>
          </el-col>
        </el-row>
      </div>
      <div v-else-if="isloading">
        Loading from Arweave...
      </div>
      <div v-else>
        <el-row :gutter="20">
          <el-col :offset="6" :span="12">
            <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black  ">You have no Chapter!</h2>
            <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black  ">Why dont you start your author
              journey today!</h2>
            <button type="button"
                    class="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    @click="handleList()"
            >
              Create
            </button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {mapGetters} from "vuex";
import {searchArweave} from "../../arweave/arweave.js";

export default {
  name: "ChapterListDisplay",
  data() {
    return {
      chapters: {},
      isloading: false
    };
  },
  computed: {
    ...mapGetters("cover", ["getCover"]),
    ...mapGetters("wallet", ["getActiveAccount"])
  },
  async created() {
    await this.$store.dispatch("cover/getSpecicCover", this.$route.params.id);
    await this.searchArweave();
  },
  methods: {
    async searchArweave() {
      this.isloading = true;
      this.chapters = await searchArweave(this.getCover.title, this.getActiveAccount);
      this.isloading = false;
    },
    handleList() {
      this.$router.push({
        name: 'chapter_create',
        params: {
          id: this.$route.params.id,
        }
      });
    },
  },
}
</script>

<style scoped>

</style>
