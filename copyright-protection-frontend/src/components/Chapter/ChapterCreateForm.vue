<template>
  <div class="container">
    <el-form>
      <el-form-item label="标题">
        <el-input v-model="title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="context" placeholder="请输入简介"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register()">{{ create }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCopyrightContract, getProviderOrSigner} from "../../utils/support";

export default {
  name: "ChapterCreateForm",
  data() {
    return {
      title: '',
      context: '',
      create: 'create',
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3", "getWeb3Modal"]),
    ...mapGetters("cover", ["getNumberOfCovers", "getCover", "getLoading"]),
  },
  watch: {
    getLoading() {
      if (this.getLoading) {
        this.create = 'loading';
      } else {
        this.create = 'Complete';
      }
    }
  },
  created() {
    if (!this.getWeb3) {
      window.alert("Please connect to a wallet");
    } else {
      this.$store.dispatch("wallet/initWeb3Modal");
      this.$store.dispatch("wallet/ethereumListener");
    }
  },
  methods: {
    async register() {
      const provider = await getProviderOrSigner(true);
      const contract = getCopyrightContract(provider);
      const txn = await contract.createCopyright(
          this.$route.params.id,
          this.title,
          this.context
      );
      this.$store.commit("cover/setLoading", true);
      await txn.wait();
      console.log(txn.hash);
      await this.$store.dispatch("cover/getCoverNum");
      await this.$store.dispatch("cover/getCovers");
      this.$store.commit("cover/setLoading", false);

    }
  }
}
</script>

<style scoped>

</style>
