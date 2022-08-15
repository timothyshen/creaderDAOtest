<template>
  <el-row :gutter="20">
    <el-col>
      <h1>{{}} Setting</h1>
      <el-form ref="form" :model="coverUpdate" label-width="80px">
        <el-form-item label="Title">
          <el-input v-model="coverUpdate.title"></el-input>
        </el-form-item>
        <el-form-item label="Short description">
          <el-input v-model="coverUpdate.description"></el-input>
        </el-form-item>
        <el-button @click="handleUpdate()">
          Update
        </el-button>
        <el-divider></el-divider>
        <div v-if="this.getAccessToken.quantity <= 0">
          <CreateMembership></CreateMembership>
        </div>
        <div>

        </div>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import CreateMembership from "./CreateMembership.vue";
import {ElMessageBox} from "element-plus";
import {mapGetters} from "vuex";

export default {
  name: "CoverSetting",
  components: {CreateMembership},
  data() {
    return {
      coverUpdate: {
        title: "",
        description: "",
      },
    }
  },
  computed: {
    ...mapGetters("cover", ["getCover"]),
    ...mapGetters("accessToken", ["getAccessToken"]),
  },
  async created() {
    await this.$store.dispatch("cover/getSpecicCover", this.$route.params.id);
    await this.$store.dispatch("accessToken/retrieveAccessToken", this.$route.params.id);
    await this.getCoverData();
  },
  methods: {
    getCoverData() {
      this.coverUpdate.title = this.getCover.title;
      this.coverUpdate.description = this.getCover.description;
    },
    async handleUpdate() {
      try {
        const signer = await getProviderOrSigner(true);
        const contract = await getCopyrightContract(signer);
        const txn = await contract.updateCover(this.getCover.id, this.coverUpdate.title, this.coverUpdate.description);
        await txn.wait();
        this.$message({
          message: 'Successfully updated!',
          type: 'success'
        });
        this.$store.dispatch("cover/getSpecicCover", this.$route.params.id);
      } catch (e) {
        ElMessageBox.alert(e.message);
      }
    }
  }

}
</script>

<style scoped>

</style>
