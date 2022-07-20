<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import PageHeader from "./components/Global/PageHeader.vue";
</script>

<template>
  <div id="app">
    <PageHeader></PageHeader>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <el-backtop :right="100" :bottom="100" />

  </div>


</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
