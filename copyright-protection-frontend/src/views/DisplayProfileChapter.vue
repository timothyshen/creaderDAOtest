<template>
  <div class="container-setting">
    <el-container>
      <el-header>
        <profile-display></profile-display>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Book-side-display></Book-side-display>
        </el-aside>
        <el-main>
          <chapter-list-display></chapter-list-display>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ProfileDisplay from "../components/Global/ProfileDisplay.vue";
import ChapterListDisplay from "../components/Chapter/ChapterListDisplay.vue";
import BookSideDisplay from "../components/Global/BookSideDisplay.vue";
export default {
  name: "DisplayProfileChapter",
  components: {ChapterListDisplay, ProfileDisplay, BookSideDisplay},
}
</script>

<style scoped>

</style>
