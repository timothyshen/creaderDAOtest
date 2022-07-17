<template>
  <nav>

    <connect-wallet></connect-wallet>
  </nav>
</template>

<script>
import ConnectWallet from "../ConnectWallet.vue";

export default {
  name: "PageHeader",
  components: {
    ConnectWallet,
  },
  data() {
    return {

    };
  },
}
</script>

<style scoped>

</style>
