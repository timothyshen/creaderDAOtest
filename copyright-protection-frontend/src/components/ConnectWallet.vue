<template>
  <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
    <a href="#"
       class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-300 hover:bg-amber-500"
       v-if="!getIsConnected" @click="connectWeb3Modal">
      Connect wallet
    </a>
    <a href="#"
       class="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-300 hover:bg-amber-500"
       v-if="getIsConnected"
       @click="disconnectWeb3Modal">
      Disconnect {{ getActiveAccount.substring(0, 7) }}...
    </a>
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
#metamask-login {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
}
</style>
