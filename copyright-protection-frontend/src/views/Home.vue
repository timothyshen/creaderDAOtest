<template>
  <el-row :gutter="20">
   <el-col :span="12" :offset="6">
      <register-cover></register-cover>
   </el-col>
  </el-row>
</template>

<script>

import RegisterCover from "../components/Cover/registerCover.vue";
export default {
  name: "Home",
  components: {RegisterCover}
}
</script>

<style scoped>

</style>
