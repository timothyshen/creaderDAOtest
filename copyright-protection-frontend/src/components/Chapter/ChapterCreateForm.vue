<template>
  <div class="container">
    <el-form>
      <el-form-item label="Title">
        <el-input v-model="title" placeholder="Please insert title"></el-input>
      </el-form-item>
      <el-form-item label="Context">
        <el-input v-model="context" placeholder="Context"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register()">{{ create }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCopyrightContract, getProviderOrSigner} from "../../utils/support";
import {mapGetters} from "vuex";

export default {
  name: "ChapterCreateForm",
  data() {
    return {
      title: '',
      context: '',
      create: 'create',
    }
  },
  params: {
    id:{
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3", "getWeb3Modal"]),
    ...mapGetters("chapter", ["getChapter", "getChapterLoading", "getLoading"]),
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
      try {
        if(this.getActiveAccount){
          const provider = await getProviderOrSigner(true);
          const contract = await getCopyrightContract(provider);
          const txn = await contract.createChapter(
              this.$route.params.id,
              this.title,
              this.context
          ).send({from: getActiveAccount});
          this.$store.commit("chapter/setLoading", true);
          await txn.wait();
          console.log(txn.hash);
          this.$store.commit("cover/setLoading", false);
        } else {
          window.alert("Please connect to a wallet");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>
