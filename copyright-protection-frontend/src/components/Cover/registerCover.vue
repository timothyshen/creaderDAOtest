<template>
  <div>
    <h1>Create a Cover!</h1>
    <el-form ref="form" :model="bookform" label-width="200px">
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
        <el-button @click="register()" :loading="loading">{{ create }}</el-button>
        <el-button @click="goBack()" >Back</el-button>
      </el-form-item>
      <el-form-item label="Create your membership!" v-if="newCoverId != null">
        <CreateMembership :coverId="newCoverId"></CreateMembership>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {mapGetters,} from "vuex";
import { getProviderOrSigner, getCopyrightNFTContract} from "../../utils/support";
import CreateMembership from "./Setting/CreateMembership.vue";

export default {
  name: "registerCover",
  components: {CreateMembership},
  data() {
    return {
      bookform: {
        title: '',
        shortDescription: '',
      },
      novel: {},
      create: 'Submit',
      loading: false,
      newCoverId: null,
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3", "getWeb3Modal"]),
    ...mapGetters("cover", ["getAuthorCovers", "getNumberOfCovers"]),
  },
  created() {
    if (!this.getWeb3) {

      this.$store.dispatch("cover/getCoverNum");
    } else {

      this.$store.dispatch("wallet/initWeb3Modal");
      this.$store.dispatch("wallet/ethereumListener");
    }
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
    },
  },
  methods: {
    async register() {
      try {
        this.loading = true;
        const provider = await getProviderOrSigner(true);
        const contract = getCopyrightNFTContract(provider);

        const txn = await contract.createCopyright(
            this.bookform.title,
            this.bookform.shortDescription,
            "active"
        );
        await txn.wait();

        contract.on("CoverCreation", (title, description, owner, status, CoverId) => {
          console.log(title, description, owner, status, CoverId);
          this.newCoverId = CoverId;
          this.newCoverId = this.newCoverId.toNumber();
        });

        this.loading = false;
        this.$message({
          message: 'Successfully created!',
          type: 'success'
        });
        this.$router.push({
          name: 'author_cover',
          params: {
            id: this.newCoverId
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleCreate(row) {
      this.$router.push({
        name: "chapter",
        params: {
          id: row.id
        }
      });
    },
    handleEdit(row) {
      this.$router.push({
        name: "cover_settings",
        params: {
          id: row.id,
        },
      });
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
