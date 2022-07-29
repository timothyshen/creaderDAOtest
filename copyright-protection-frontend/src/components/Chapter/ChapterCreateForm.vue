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
    <div>
      <el-button @click="clickArweaveData('6ddzHMhMQvQbU0JqMsz_e8vsvBWsvgpKsgdokSIpLq0')">{{ create }}</el-button>
      {{ arweave_chapter }}
      <el-button @click="clickforlist">{{ create }}</el-button>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import {getCopyrightContract, getProviderOrSigner} from "../../utils/support";
import {mapGetters} from "vuex";
import { postChapterCreate } from "../../api/local_db";
import { getArweaveData, searchArweave } from "../../arweave/arweave";
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
      arweave_chapter:{},
      arweave_chapter_id: {},
    }
  },
  params: {
    id: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3", "getWeb3Modal"]),
    ...mapGetters("chapter", ["getChapter", "getLoading"]),
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
      this.$store.dispatch("chapter/retrieveChapter", this.$route.params.id);
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
          const response = await createArweaveTrans(chapterData, this.getActiveAccount);

          console.log(response);

        } else {
          window.alert("Please connect to a wallet");
        }
      } catch (error) {
        console.log(error);

      }
    },
    clickArweaveData(id) {
      getArweaveData(id).then(res => {
        this.arweave_chapter = res;
      }).catch(err => {
        console.log(err);
      });
    },
    clickforlist(){
      const user = this.getActiveAccount;
      searchArweave(user).then(res => {
        this.arweave_chapter_id = res;
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>

</style>
