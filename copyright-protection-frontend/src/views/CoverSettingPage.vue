<template>
  <div class="container-setting">
    <el-container>
      <el-header>
        <profile-display></profile-display>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <BookSideDisplay></BookSideDisplay>
        </el-aside>
        <el-main>
          <cover-setting></cover-setting>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import BookSideDisplay from "../components/Global/BookSideDisplay.vue";
import ProfileDisplay from "../components/Global/ProfileDisplay.vue";
import CoverSetting from "../components/Cover/Setting/CoverSetting.vue";

export default {
  name: "CoverSettingPage",
  components: {CoverSetting, ProfileDisplay, BookSideDisplay},

}
</script>

<style scoped>
.container-setting{
  height: 100%;
  width: 1080px;
  margin: 0 auto;
}
</style>
