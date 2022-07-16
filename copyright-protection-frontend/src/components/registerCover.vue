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
  <el-table :data="this.getCover" style="width:100%">
    <el-table-column label="ID" prop="id"></el-table-column>
    <el-table-column label="Author" prop="owner"></el-table-column>
    <el-table-column label="Title" prop="title"></el-table-column>
    <el-table-column label="Short description" prop="description"></el-table-column>
    <el-table-column label="Edit" width="120">
      <template #default>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

import { mapGetters, } from "vuex";
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
