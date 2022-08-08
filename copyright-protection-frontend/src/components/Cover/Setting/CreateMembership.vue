<template>
  <div>
    <el-switch
        v-model="isMembershipCreated"
        :disabled="membershipCreated"
        active-text="NFT"
    ></el-switch>
    <div v-if="membershipCreated">
      Your collection has already been created!
    </div>
    <el-dialog v-model="dialogFormVisible">
      <div>Create your Memership Collection!</div>
      <el-form>
        <el-form-item label="Quantitly">
          <el-input v-model="membership.title"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="membership.price"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="createMembershipCollection">{{ create }}</el-button>
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {ethers, BigNumber} from "ethers";
import {getProviderOrSigner, getAccessTokenContract} from "../../../utils/support";
import {ElMessageBox} from "element-plus";

export default {
  name: "CreateMembership",
  props: {
    coverId: {
      type: Number,
    },
  },
  data() {
    return {
      isMembershipCreated: false,
      dialogFormVisible: false,
      membershipCreated: false,
      membership: {
        title: '',
        price: '',
      },
      create: 'Submit',
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
    ...mapGetters("accessToken", ["getAccessToken",]),
    checkMembership() {
      if (this.getAccessToken) {
        this.membershipCreated = true;
      }
    },
  },
  methods: {
    async createMembershipCollection() {
      try {
        this.create = 'Loading...';
        const decimals = 18;
        let price = ethers.utils.parseUnits(this.membership.price,decimals);
        const signer = await getProviderOrSigner(true);
        // console.log(signer);
        const accessTokenContract = await getAccessTokenContract(signer);
        // console.log(accessTokenContract);
        // console.log(price);
        const txn = await accessTokenContract.createMemberships(
            0,
            this.membership.title,
            price,
            this.getActiveAccount,
        );
        await txn.wait();
        // console.log(txn);
        this.create = 'Submitted';
        this.isMembershipCreated = true;
        this.membershipCreated = true;
      } catch (error) {
        console.log(error);
      }
    },
    handleCreate() {
      ElMessageBox.confirm('Are you sure to close this dialog?')
          .then(() => {
            this.dialogFormVisible = false;
            this.isMembershipCreated = false;
            done()
          })
          .catch(() => {
            // catch error
          })
    },
  },
}
</script>

<style scoped>

</style>
