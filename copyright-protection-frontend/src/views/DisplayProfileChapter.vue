<template>
  <div class="container-setting">
    <el-container>
      <el-header>
        <ProfileDisplayChapter></ProfileDisplayChapter>
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
import ProfileDisplayChapter from "../components/Global/ProfileDisplayChapter.vue";
import ChapterListDisplay from "../components/Chapter/ChapterListDisplay.vue";
import BookSideDisplay from "../components/Global/BookSideDisplay.vue";
export default {
  name: "DisplayProfileChapter",
  components: {ChapterListDisplay, ProfileDisplayChapter, BookSideDisplay},
}
</script>

<style scoped>
.container-setting{
  height: 100%;
  width: 1080px;
  margin: 0 auto;
}
</style>
