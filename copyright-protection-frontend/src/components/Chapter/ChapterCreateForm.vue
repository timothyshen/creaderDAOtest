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

          /*
           this is the part for etherum transaction to create a new chapter
           */
          const provider = await getProviderOrSigner(true);
          const contract = await getCopyrightContract(provider);

          const txn = await contract.createChapter(
              this.$route.params.id,
              this.title,
              this.context
          );
          this.loading = true;
          await txn.wait();
          console.log(txn.hash);
          this.loading = false;
          this.$message({
            message: `Success fully created chapter ${this.title}\n
            Transaction hash: ${txn.hash}`,
            type: 'success'
          });

          /*
            this is the part for local db transaction to create a new chapter
           */
          // await postChapterCreate({
          //   bookID: this.$route.params.id,
          //   arID: 'U7ATwmfXm2_Qoe86mKaaFlB5iRd4_OzixHz5mANFagU',
          //   title: this.title,
          //   body: this.context,
          //   isAuthed: true,
          // }, this.$route.params.id).then(res => {
          //   console.log(res);
          // }).catch(err => {
          //   console.log(err);
          // });
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
