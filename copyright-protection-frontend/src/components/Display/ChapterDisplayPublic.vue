<template>

  <div v-if="chapter">
    <el-row :gutter="20">
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
      </el-col>
    </el-row>
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
    };
  },
  computed: {
    ...mapGetters("cover", ["getCover"]),
  },
  created() {
    this.$store.dispatch("cover/getSpecicCover", this.$route.params.id);
    this.searchArweave();
  },
  methods: {
    async searchArweave() {
      this.chapter = await getArweaveData(this.$route.params.chapterId);
    },
    backToCover() {
      this.$router.push({
        name: "home",

      });
    },
  },
}
</script>

<style scoped>

</style>
