<template>
  <ul class="navbar-nav px-3">
    <li class="nav-item text-nowrap">
      <a class="nav-link" href="#" v-if="!getIsConnected" @click="connectWeb3Modal">Connect your wallet</a>
      <a class="nav-link" href="#" v-if="getIsConnected" @click="disconnectWeb3Modal">Disconnect {{getActiveAccount.substring(0, 7)}}...</a>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "connect wallet",
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getIsConnected", "getWeb3Modal"]),
  },
  created() {
    this.$store.dispatch("wallet/initWeb3Modal");
    this.$store.dispatch("wallet/ethereumListener");
  },
  watch:{
    "$store.state.wallet.isconn"
  },
  methods: {
    ...mapActions("wallet", ["connectWeb3Modal", "disconnectWeb3Modal"]),
  }
}
</script>

<style scoped>

</style>
