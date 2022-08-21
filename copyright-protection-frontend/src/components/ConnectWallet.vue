<template>
  <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
    <button
        type="button"
        class="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border  rounded-md shadow-sm text-base font-medium text-gray-600 bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 transition duration-150 ease-in-out"
        v-if="!getIsConnected"
        @click="connectWeb3Modal"
    >
      Connect with Wallet
    </button>
    <button
        type="button"
        class="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border  rounded-md shadow-sm text-base font-medium text-gray-600 bg-white hover:bg-gray-100 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 transition duration-150 ease-in-out"
        v-else-if="getChainId !== '0x13881'"
        @click="chainSwitch"
    >
      change chain
    </button>
    <!--    <vue-gravatar email="timtitm" :size="150" default-image="mp"/>-->
    <div v-if="getIsConnected && getChainId === '0x13881'">
      <img class="inline-block h-10 w-10 rounded-full ring-2 ring-white focus:ring-black hover:ring-black hover:cursor-pointer"
           src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
           alt="user avatar"
           @click="handleProfile"/>
      <a href="#"
         class="ml-4 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-amber-300 hover:bg-amber-500"
         @click="handleDashboard">
        Dashboard
      </a>
      <a href="#"
         class="ml-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-amber-300 hover:bg-amber-500"
         @click="disconnectWeb3Modal">
        Disconnect {{ getActiveAccount.substring(0, 7) }}...
      </a>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import { chainSwitch } from "../utils/support.js";

export default {
  name: "connect wallet",
  computed: {
    ...mapGetters("wallet", ["getActiveAccount", "getChainId", "getIsConnected"])
  },
  created() {
    this.$store.dispatch("wallet/initWeb3Modal");
    this.$store.dispatch("wallet/ethereumListener");
  },
  watch: {},
  methods: {
    ...mapActions("wallet", ["connectWeb3Modal", "disconnectWeb3Modal"]),
    handleProfile() {
      this.$router.push({
        name: "profile",
      });
    },
    chainSwitch() {
      chainSwitch();
    },
    handleDashboard() {
      this.$router.push({
        name: "author_cover",
      });
    }
  },
}
</script>

<style scoped>
</style>
