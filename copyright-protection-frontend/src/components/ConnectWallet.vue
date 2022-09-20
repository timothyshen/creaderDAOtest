<template>
  <div>
    <button
        type="button"
        class="flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm text-white bg-yellow-400 hover:bg-gray-100 "
        v-if="!getIsConnected"
        @click="connectWeb3Modal"
    >
      Connect with Wallet
    </button>
    <button
        type="button"
        class="flex w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm text-white bg-yellow-400 hover:bg-gray-100 transition duration-150 ease-in-out"
        v-else-if="getChainId !== '0x13881'"
        @click="chainSwitch"
    >
      change chain
    </button>
    <div v-if="getIsConnected && getChainId === '0x13881'">
      <el-popover
          :width="300"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
      >
        <template #reference>
          <img
              class="inline-block h-10 w-10 rounded-full ring-2 ring-white focus:ring-black hover:ring-black hover:cursor-pointer"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              alt="user avatar"
              />
        </template>
        <template #default>
          <div>
            <a
                class="w-full my-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-amber-300 hover:bg-amber-500"
                @click="handleProfile"
            >
              Profile
            </a>
            <a
                class="w-full my-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-amber-300 hover:bg-amber-500"
                @click="handleDashboard"
            >
              Dashboard
            </a>
            <a
                class=" w-full my-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-gray-600 bg-amber-300 hover:bg-amber-500"
                @click="disconnectWeb3Modal">
              Disconnect
            </a>
          </div>
        </template>
      </el-popover>
      <span> Username </span>
      <span> {{getActiveAccount.substring(0,7)}} ... </span>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {chainSwitch} from "../utils/support.js";

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
