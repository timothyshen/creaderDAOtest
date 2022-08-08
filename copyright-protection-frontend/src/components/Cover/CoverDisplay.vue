<template>
  <el-row :gutter="20">
    <el-col :span="16" :offset="4">
      <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black text-left ">My Covers</h2>
      <el-divider></el-divider>
      <div v-if="getAuthorCovers.length != 0" v-for="cover in getAuthorCovers">
        <el-row class="grid-content" :gutter="20">
          <el-col :span="8">
            <span class="item-span">Cover title</span>
            <h3 class="item-content">{{ cover.title }}</h3>
          </el-col>
          <el-col :span="4">
            <span class="item-span">Description</span>
            <h3 class="item-content">{{ cover.description }}</h3>
          </el-col>
          <el-col :span="4">
            <span class="item-span">Status</span>
            <h3 class="item-content">{{ cover.status }}</h3>
          </el-col>
          <el-col class="pt-3" :span="8">

            <button type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="handleClick('cover_settings', cover)">
              Edit
            </button>
            <button type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="handleClick('cover_list', cover)">
              List
            </button>
            <button type="button"
                    class="text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    @click="handleClick('chapter_create', cover)">
              Chapters
            </button>

          </el-col>
        </el-row>

      </div>
      <div v-else>
        <el-row :gutter="20">
          <el-col :offset="6" :span="12">
            <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black  ">You have no cover!</h2>
            <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black  ">Why dont you start your author
              journey today!</h2>
            <button type="button"
                    class="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    @click="handleCreate('cover_create')">
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

export default {
  name: "CoverDisplay",
  data() {
    return {}
  },
  computed: {
    ...mapGetters("cover", ["getAuthorCovers", "getNumberOfCovers"]),
  },
  created() {
    this.$store.dispatch("wallet/initWeb3Modal");
    this.$store.dispatch("wallet/ethereumListener");
    this.$store.dispatch("cover/getCoverNum");
    this.$store.dispatch("cover/getAuthorCover");
  },
  methods: {
    handleClick(type, cover) {
      let coverId = cover.id.toNumber();
      let coverTitle = cover.title;
      this.$router.push({
        name: type,
        params: {
          id: coverId,
          title: coverTitle,
        }
      });
    },
    handleCreate() {
      this.$router.push({
        name: "cover_create",
      });
    }
  }
}
</script>

<style scoped>

.grid-content {
  padding: 20px;
  margin: 20px;
  min-height: 100px;
  line-height: 30px;
  border-radius: 20px;
  background-color: #C1BDBD23;
  text-align: left;
}

.grid-content el-col:nth-child(1), .grid-content el-col:nth-child(2) {
  padding: 10px;
}

.item-span {
  font-weight: bold;
  text-align: left;
  font-size: small;
}

.item-content {
  font-size: large;
}

.item-button-group {
  text-align: right;
}

</style>
