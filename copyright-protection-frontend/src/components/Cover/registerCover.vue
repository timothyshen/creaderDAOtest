<template>
  <div>
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
        <el-button @click="register()" :loading="loading">{{ create }}</el-button>
      </el-form-item>
    </el-form>
    <h1>Number of covers: {{ getNumberOfCovers }}</h1>
    <el-table :data="this.getAuthorCovers" style="width:100%">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="Author" prop="owner"></el-table-column>
      <el-table-column label="Title" prop="title"></el-table-column>
      <el-table-column label="Short description" prop="description"></el-table-column>
      <el-table-column label="Edit" width="120">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleEdit(scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {ethers} from "ethers";
import {mapGetters,} from "vuex";
import {getCopyrightContract, getProviderOrSigner, getCopyrightNFTContract} from "../../utils/support";

export default {
  name: "registerCover",
  data() {
    return {
      bookform: {
        title: '',
        shortDescription: '',
      },
      novel: {},
      create: 'Submit',
      loading: false,
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
      this.$store.dispatch("cover/getCoverNum");
      this.$store.dispatch("cover/getAuthorCover");
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
        let coverId;
        this.loading = true;
        const provider = await getProviderOrSigner(true);
        const contract = getCopyrightContract(provider);
        const txn = await contract.createCopyright(
            this.bookform.title,
            this.bookform.shortDescription
        );
        await txn.wait();
        console.log(txn);
        contract.on("CoverCreation", async (title, description, owner, status, CoverId) => {
          coverId = CoverId.toNumber();
          const contractNFT = getCopyrightNFTContract(provider);
          console.log(coverId);
          const txnNFT = await contractNFT.mintCopyright(coverId);
          await txnNFT.wait();
          console.log(txnNFT);
        })
        await this.$store.dispatch("cover/getCoverNum");
        await this.$store.dispatch("cover/getAuthorCover");
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    handleEdit(row) {
      this.$router.push({
        name: "chapter",
        params: {
          id: row.id
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
