<template>
  <div>
    <el-row :gutter="20" v-if="isLoading === false">
      <el-col :offset="4" :span="16">
        <h2 class="font-medium leading-tight text-4xl mt-0 mb-2 text-blue-600">{{ chapter.data.title }}</h2>
        <h4 class="font-medium leading-tight text-sm mt-0 mb-2 text-blue-600">{{ chapter.tags.Address }}</h4>
        <h4 class="font-medium leading-tight text-sm mt-0 mb-2 text-blue-600">{{ chapter.timestamp }}</h4>

        {{ chapter.data.context }}
        <el-row :gutter="20">
          <el-col :offset="6" :span="12" class="border-2 h-10 mt-2 leading-10">
            <a>
              Arweave tx id: {{ chapter.id }}
            </a>
          </el-col>
        </el-row>
        <button @click="backToCover">back</button>
      </el-col>
    </el-row>
    <div v-else>
      Loading..
    </div>
  </div>
</template>

<script>
import {getArweaveData} from "../../arweave/arweave.js";
import {mapGetters} from "vuex";

export default {
  name: "ChapterDisplayPublic",
  data() {
    return {
      chapter: {},
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("cover", ["getCover"]),
  },
  created() {
    this.$store.dispatch("cover/getSpecificCover", this.$route.params.id);
    this.searchArweave();
  },
  methods: {
    async searchArweave() {
      this.isLoading = true;
      this.chapter = await getArweaveData(this.$route.params.chapterId);
      this.isLoading = false;
    },
    backToCover() {
      this.$router.go(-1);
    },
  },
}
</script>

<style scoped>

</style>
