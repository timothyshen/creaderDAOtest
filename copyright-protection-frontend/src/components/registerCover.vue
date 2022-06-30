<template>
  <h1>Register</h1>
  <el-form ref="form" :model="bookform" label-width="80px">
    <el-form-item label="Title">
      <el-input v-model="bookform.title"></el-input>
    </el-form-item>
    <el-form-item label="Short description">
      <el-input v-model="bookform.shortDescription"></el-input>
    </el-form-item>
<!--    <el-form-item label="Short description">-->
<!--      <el-input v-model="bookform.longDescription"-->
<!--                maxlength="200"-->
<!--                show-word-limit-->
<!--                type="textarea"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="Cover image">-->
<!--      <el-input v-model="bookform.imageHash"></el-input>-->
<!--    </el-form-item>-->
    <el-form-item>
      <el-button @click="register()">Register</el-button>
    </el-form-item>
  </el-form>
  <h1>Number of covers: {{ getNumberOfCovers }}</h1>
  <div>
    <div class="container" v-for="cover in this.getCover" key="cover.id.toString()">
      <p>Author: <span>{{ cover.owner }}</span></p>
      <p>Title: <span>{{ cover.title }}</span></p>
      <p>Short description: <span>{{ cover.description }}</span></p>
    </div>
  </div>
</template>

<script>

import {mapGetters, } from "vuex";
import {getCopyrightContract, getProviderOrSigner} from "../utils/support";

export default {
  name: "registerCover",
  data() {
    return {
      bookform: {
        title: '',
        shortDescription: '',
      },
      novel: {},
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3","getWeb3Modal"]),
    ...mapGetters("cover", ["getNumberOfCovers", "getCover"]),
  },
  created() {
    if (!this.getWeb3) {

      this.$store.dispatch("cover/getCoverNum");
    } else {

      this.$store.dispatch("wallet/initWeb3Modal");
      this.$store.dispatch("wallet/ethereumListener");
      console.log(this.getWeb3Modal);
      this.$store.dispatch("cover/getCoverNum");
      this.$store.dispatch("cover/getCovers");
    }
  },
  methods: {
    async register() {
        try {
          const provider = await getProviderOrSigner(true);
          console.log(provider);
          const contract = getCopyrightContract(provider);
          console.log(contract);
          const txn = await contract.createCopyright(
              this.bookform.title,
              this.bookform.shortDescription
          );
          this.$store.commit("cover/setLoading", true);
          await txn.wait();
          this.$store.commit("cover/setLoading", false);
        } catch (error) {
          console.log(error);
        }
    }
  }
}
</script>

<style scoped>

</style>
