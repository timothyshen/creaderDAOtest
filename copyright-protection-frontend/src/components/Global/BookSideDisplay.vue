<template>
  <div>
    <div>
      <el-page-header content="Cover" @back="goBack" />
    </div>
    <div>
      <el-image
          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          fit="fill"
      ></el-image>
    </div>
    <div>
      <p>Book Name:</p>
      <p>{{ getCover.title }}</p>
    </div>
    <div>
      <button type="button"
              class="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              @click="handleList()"
      >
        Chapter List
      </button>
      <button type="button"
              class="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              @click="handleSetting()"
      >
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "BookSideDisplay",
  computed: {
    ...mapGetters("cover", ["getCover"])
  },
  async created() {
    await this.$store.dispatch("cover/getSpecicCover", this.$route.params.id);
  },
  methods:{
    handleSetting() {
      let id = this.$route.params.id;
      console.log(id);
      this.$router.push({
        name: 'cover_settings',
        params: {
          id: id,
        }
      });
    },
    handleList() {
      this.$router.push({
        name: 'cover_list',
        params: {
          id: this.$route.params.id,
        }
      });
    },
    goBack() {
      this.$router.push({
        name: 'author_cover'
      });
    }
  }
}
</script>

<style scoped>

</style>
