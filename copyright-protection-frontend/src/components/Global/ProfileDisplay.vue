<template>
  <el-row class="grid-content  leading-6" :gutter="20">
    <el-col class="profile-avatar" :offset="4" :span="2">
      <el-avatar>
      </el-avatar>
    </el-col>
    <el-col :span="2">

      <h1>{{ getActiveAccount.substring(0, 7) + "..." }}</h1>
    </el-col>

    <el-col :offset="8" :span="6">
      <button type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
              @click="handleClick()">
        Create
      </button>
    </el-col>
  </el-row>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "DisplayProfileBook",
  computed: {
    ...mapGetters("wallet", ["getActiveAccount"])
  },
  methods: {
    handleClick() {
      this.$router.push({
        name: "cover_create",
      });
    }
  }
}
</script>

<style scoped>
.grid-content {
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
