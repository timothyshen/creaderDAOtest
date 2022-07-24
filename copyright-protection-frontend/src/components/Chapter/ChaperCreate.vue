<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3>Create a new book</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="bookform.title">
              </div>
              <div class="form-group">
                <label for="shortDescription">Short description</label>
                <input type="text" class="form-control" id="shortDescription" v-model="bookform.shortDescription">
              </div>
              <button type="submit" class="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCopyrightContract, getProviderOrSigner} from "../../utils/support";

export default {
  name: "ChaperCreate",
  data() {
    return {
      bookform: {
        title: '',
        shortDescription: '',
      },
      novel: {},
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getWeb3","getWeb3Modal"]),
    ...mapGetters("cover", ["getNumberOfCovers", "getCover"]),
  },
  created() {
    if (!this.getWeb3) {


    } else {

      this.$store.dispatch("wallet/initWeb3Modal");
      this.$store.dispatch("wallet/ethereumListener");
    }
  },
  methods: {
    register() {
      const provider = getProviderOrSigner(this.getWeb3);
      const contract = getCopyrightContract(provider);
      contract.createCover(this.bookform.title, this.bookform.shortDescription).send({from: this.getActiveAccount})
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
</script>

<style scoped>

</style>
