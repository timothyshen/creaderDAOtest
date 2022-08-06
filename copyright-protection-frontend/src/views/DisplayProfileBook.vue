<template>
  <div class="container-setting">
    <el-container>
      <el-header>
        <profile-display></profile-display>
      </el-header>
      <el-container>
        <el-main>
          <cover-display></cover-display>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import CoverDisplay from "../components/Cover/CoverDisplay.vue";
import ProfileDisplay from "../components/Global/ProfileDisplay.vue";
export default {
  name: "DisplayBook",
  components: {ProfileDisplay, CoverDisplay},
  data() {
    return {
      novel: {},
    };
  },
  created() {

  },
}
</script>

<style scoped>

</style>
