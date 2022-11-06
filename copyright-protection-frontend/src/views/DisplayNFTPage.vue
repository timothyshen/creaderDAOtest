<template>
  <div class="container-setting">
    <el-container>
      <el-header>
        <profile-display></profile-display>
      </el-header>
      <el-container>
        <el-main>
          <UserNFTList></UserNFTList>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ProfileDisplay from "../components/Global/ProfileDisplay.vue";
import UserNFTList from "../components/User/Profile/UserNFTList.vue";
export default {
  name: "DisplayNFTPage",
  components: {ProfileDisplay, UserNFTList},
}
</script>

<style scoped>

</style>
