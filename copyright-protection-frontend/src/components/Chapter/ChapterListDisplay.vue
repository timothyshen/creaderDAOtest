<template>
  <el-row :gutter="20">
    <el-col>
      <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black text-left ">{{ getCover.title }}</h2>
      <el-divider></el-divider>
      <div v-if="chapters">
        <el-row class="grid-content" :gutter="20" v-for="chapter in chapters">
          <el-col :span="8">
            <span class="item-span">Cover title</span>
            <h3 class="item-content">{{ chapter.data.title }}</h3>
          </el-col>
          <el-col :span="8">
            <span class="item-span">Last Update</span>
            <h3 class="item-content">{{ chapter.timestamp }}</h3>
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
      <div v-else>
        <el-row :gutter="20">
          <el-col :offset="6" :span="12">
            <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black  ">You have no Chapter!</h2>
            <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black  ">Why dont you start your author
              journey today!</h2>
            <button type="button"
                    class="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
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
      this.chapters = await searchArweave(this.getCover.title, this.getActiveAccount);
    }
  },
}
</script>

<style scoped>

</style>
