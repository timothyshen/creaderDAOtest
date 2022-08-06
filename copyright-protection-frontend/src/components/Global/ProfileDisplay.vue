<template>
  <el-row class="grid-content" :gutter="20">
   <el-col class="profile-avatar" :span="6">
     <el-avatar >
     </el-avatar>
   </el-col>
    <el-col :span="6">
      <h1>{{getActiveAccount}}</h1>
    </el-col>
    <el-col :offset="4" :span="6">
      <el-button>Create</el-button>
    </el-col>

  </el-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "DisplayProfileBook",
  computed:{
    ...mapGetters("wallet", ["getActiveAccount"])
  }
}
</script>

<style scoped>
.grid-content{
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: 50px;
  border-radius: 5px;
  line-height: 50px;
}
.profile-avatar {
  text-align: right;
}
</style>
