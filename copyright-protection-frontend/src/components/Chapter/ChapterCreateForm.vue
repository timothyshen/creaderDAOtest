<template>
  <div class="container">
    <h1>Create a chapter!</h1>
    <el-form
        label-position="top"
    >
      <el-form-item label="Title">
        <el-input
            v-model="title" placeholder="Please insert title"></el-input>
      </el-form-item>
      <el-form-item label="Context">
        <el-input
            v-model="context"
            type="textarea"
            placeholder="Context"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="register()">{{ create }}</el-button>
        <el-button @click="goBack()">Back</el-button>
      </el-form-item>
    </el-form>
    <div>

    </div>
  </div>
</template>

<script>
import {getCopyrightContract, getProviderOrSigner} from "../../utils/support";
import {mapGetters} from "vuex";
import {postChapterCreate} from "../../api/local_db";
import {getArweaveData, searchArweave, createArweaveTrans} from "../../arweave/arweave";
import axios from "axios";
import Arweave from "arweave";

export default {
  name: "ChapterCreateForm",
  data() {
    return {
      title: '',
      context: '',
      create: 'Submit',
      loading: false,
    }
  },
  params: {
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3", "getWeb3Modal"]),
    ...mapGetters("cover", ["getCover", "getSpecicCover"]),
  },
  watch: {
    loading(newVal) {
      if (!this.getActiveAccount) {
        this.create = "Connect Your Wallet!";
      }
      if (newVal) {
        this.create = 'Loading...';
      } else {
        this.create = 'Submit';
      }
    }
  },
  created() {
    if (!this.getWeb3) {
      window.alert("Please connect to a wallet");
    } else {
      this.$store.dispatch("wallet/initWeb3Modal");
      this.$store.dispatch("wallet/ethereumListener");
      this.$store.dispatch("cover/getSpecicCover", this.$route.params.id);
    }
  },
  methods: {
    async register() {
      try {
        this.loading = true;
        if (this.getActiveAccount) {
          const chapterData = JSON.stringify({
            title: this.title,
            context: this.context,
          })
          const response = await createArweaveTrans(chapterData, this.getActiveAccount, this.getCover.title);

          console.log(response);
          this.loading = false;
          this.$router.push({
            name: "author_cover",
          });
        } else {
          window.alert("Please connect to a wallet");
        }
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.push({
        name: "author_cover",
      });
    }
  }
}
</script>

<style scoped>

</style>
