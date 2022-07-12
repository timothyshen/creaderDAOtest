<template>
  <div class="buttons">
    <a class="btn btn-login" href="#" v-if="!getIsConnected" @click="connectWeb3Modal">Connect your wallet</a>
    <a class="btn btn-logout" href="#" v-if="getIsConnected" @click="disconnectWeb3Modal">Disconnect
      {{ getActiveAccount.substring(0, 7) }}...</a>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "connect wallet",
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getIsConnected", "getWeb3Modal"]),
  },
  created() {
    this.$store.dispatch("wallet/initWeb3Modal");
    this.$store.dispatch("wallet/ethereumListener");
  },
  watch: {},
  methods: {
    ...mapActions("wallet", ["connectWeb3Modal", "disconnectWeb3Modal"]),
  }
}
</script>

<style scoped>
  .buttons {

  }
</style>
