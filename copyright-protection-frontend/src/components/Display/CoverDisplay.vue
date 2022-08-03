<template>
  <div>
    <div>
      <el-button>create</el-button>
    </div>
    <el-row :gutter="20">
      <el-col :span="14" :offset="4">
        <el-row :gutter="20">
          <el-col span="8">
            x
          </el-col>
          <el-col span="8">
            x
          </el-col>
          <el-col span="8">
            x
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CoverDisplay"
}
</script>

<style scoped>

</style>
