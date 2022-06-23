<template>
  <h1>Register</h1>
  <el-form ref="form" :model="bookform" label-width="80px">
    <el-form-item label="Title">
      <el-input v-model="bookform.title"></el-input>
    </el-form-item>
    <el-form-item label="Short description">
      <el-input v-model="bookform.shortDescription"></el-input>
    </el-form-item>
    <el-form-item label="Short description">
      <el-input v-model="bookform.longDescription"
                maxlength="200"
                show-word-limit
                type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="Cover image">
      <el-input v-model="bookform.imageHash"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="register()">Register</el-button>
    </el-form-item>
  </el-form>
  <div>
    <h1>Number of covers: {{ getNumberOfCovers }}</h1>
    <div class="container">
      <p>Title</p>
      <span>{{ novel.title }}</span>
      <p>Short description</p>
      <span>{{ novel.shortDescription }}</span>
      <p>Long description</p>
      <span>{{ novel.longDescription }}</span>
      <p>Cover image</p>
      <span>{{ novel.imageHash }}</span>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";

export default {
  name: "registerCover",
  data() {
    return {
      bookform: {
        title: '',
        shortDescription: '',
        longDescription: '',
        imageHash: '',
      },
      novel: {},
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3","getWeb3Modal"]),
    ...mapGetters("cover", ["getNumberOfCovers"]),
  },
  created() {
    if (!this.getWeb3) {

      this.$store.dispatch("cover/getCoverNum");
    } else {

      this.$store.dispatch("wallet/initWeb3Modal");
      this.$store.dispatch("wallet/ethereumListener");
      console.log(this.getWeb3Modal);
      this.$store.dispatch("cover/getCoverNum");
    }
  },
  methods: {
    async register() {
      // async createCover({commit}, {title, description}) {
      //   try {
      //     console.log(title, description);
      //     const provider = await getProviderOrSigner();
      //     console.log(provider);
      //     const contract = getCopyrightContract(provider);
      //     const txn = await contract.createCopyright(
      //         title,
      //         description
      //     );
      //     commit('setLoading', true);
      //     await txn.wait();
      //     await actions.getCovers({commit});
      //     commit('setLoading', false);
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
    }
  }
}
</script>

<style scoped>

</style>
