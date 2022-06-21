<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import ConnectWallet from "./components/ConnectWallet.vue";
import RegisterCover from "./components/registerCover.vue";
import DisplayBook from "./components/DisplayBook.vue";
</script>

<template>
  <div id="app">
    <connect-wallet></connect-wallet>
    <register-cover></register-cover>
    <display-book></display-book>
  </div>


</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
