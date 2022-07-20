<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
    <ChapterCreateForm></ChapterCreateForm>
    </el-col>
  </el-row>
</template>

<script>
import ChapterCreateForm from "../components/Chapter/ChapterCreateForm.vue";
export default {
  name: "CreateChapter",
  components: {ChapterCreateForm}
}
</script>

<style scoped>

</style>
