<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import PageHeader from "./components/Global/PageHeader.vue";
import FooterComponent from "./components/Global/FooterComponent.vue";

</script>

<template>
  <div id="app">
    <PageHeader></PageHeader>
    <router-view v-slot="{ Component }" id="page_content">
      <suspense>
        <div>
          <component :is="Component" />
        </div>

      </suspense>
    </router-view>
    <el-backtop class="hidden md:flex" :right="50" :bottom="50" />
    <FooterComponent></FooterComponent>
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

#page_content{
  min-height: 1920px;
  margin-bottom: 100px;
}
</style>
