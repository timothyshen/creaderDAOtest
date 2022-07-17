<template>
  <div class="buttons">
    <el-button type="Primary" plain v-if="!getIsConnected" @click="connectWeb3Modal">Connect wallet</el-button>
    <el-button type="Primary" plain v-if="getIsConnected" @click="disconnectWeb3Modal">Disconnect
      {{ getActiveAccount.substring(0, 7) }}...</el-button>
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
