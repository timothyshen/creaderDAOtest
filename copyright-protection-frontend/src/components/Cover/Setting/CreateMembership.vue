<template>
  <div>
    <el-switch v-model="isMembershipCreated"></el-switch>
    <el-dialog v-model="dialogFormVisible">
      <div>Create your Memership Collection!</div>
      <el-form>
        <el-form-item label="Quantitly">
          <el-input v-model="membership.title"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="membership.title"></el-input>
        </el-form-item>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
      </span>
        </template>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import ethers from "ethers";
import {getProviderOrSigner, getAccessTokenContract} from "../../../utils/support";

export default {
  name: "CreateMembership",
  data() {
    return {
      isMembershipCreated: false,
      dialogFormVisible: false,
      membership: {
        title: '',
        price: '',
      },
    };
  },
  watch: {
    isMembershipCreated(newVal) {
      if (newVal) {
        this.dialogFormVisible = true;
      }
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3", "getWeb3Modal"]),
    ...mapGetters("accessToken", ["getAccessToken", ]),
  },
  methods: {
    async createMembershipCollection() {
      try {
        this.membership.price = ethers.utils.parseEther(this.membership.price);
        const signer = getProviderOrSigner(true);
        const accessTokenContract = await getAccessTokenContract(signer);
        const txn = await accessTokenContract.createMemberships(
            this.membership.title,
            this.membership.price,
            this.getActiveAccount,

        );
        await txn.wait();

      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>

</style>
