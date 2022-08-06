<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-row :gutter="24" class="book_detail">
        <el-col :span="6">
          <el-image
              :src="url"
              fit="none"
          ></el-image>
        </el-col>
        <el-col :span="18" class="detail_header">
          <el-container>
            <el-header>
              <div>
<!--                <h1 class="title">{{this.book_info.title}}</h1>-->
<!--                <h2 class="subtitle">{{ book_info ? book_info.author.username : '' }}</h2>-->
                <h1>
                  title of book
                </h1>
                <h2>
                  author of book
                </h2>
              </div>
              <el-rate
                  v-model="value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
              >
              </el-rate>
            </el-header>
            <div class="short_des">
<!--              <p>{{ this.book_info.description }}</p>-->
              <p>description</p>
            </div>
            <el-divider></el-divider>
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">View</p>
                  <p class="title total_click_styple">100</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Rating</p>
                  <p class="title">6</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Likes</p>
                  <p class="title">120</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">Chapters</p>
                  <p class="title">50</p>
                </div>
              </div>
            </nav>
            <el-divider>
              <el-footer class="book_button">
                <el-button type="primary" round>
                  <i class="el-icon-notebook-2 el-icon--right"></i> Start Reading
                </el-button>
                <el-button type="primary" round><i class="el-icon-plus el-icon--right"></i></el-button>
                <el-button type="primary" round><i class="el-icon-share el-icon--right"></i></el-button>
              </el-footer>
            </el-divider>
          </el-container>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="text-align: justify">
        <el-col>
          <el-main>
            <span>Detail</span>
            <el-divider direction="vertical"></el-divider>
            <span>Table of content</span>
          </el-main>
        </el-col>
        <el-col>
          <el-main>
            <h3 class="title is-3">Tags</h3>
            <el-space wrap>
              <el-tag type="success">Tag</el-tag>
              <el-tag type="success">Tag</el-tag>
              <el-tag type="success">Tag</el-tag>
              <el-tag type="success">Tag</el-tag>
            </el-space>
          </el-main>
          <el-main>
            <div>Total Supply</div>
            <el-button :click="mintMyPass" :loading="loading">{{ mint }}</el-button>
          </el-main>
        </el-col>
        <el-col>
          <div class="infinite-list-wrapper" style="overflow:auto">
            <ul
                class="list columns is-multiline is-mobile has-text-centered	"
                v-infinite-scroll="load"
                style="overflow:auto"
            >
              <div v-for="i in chapters" class="column is-one-quarter">
                <span>{{ i.bookName + 1 }}</span>. <span>{{ i.chaptername }}</span>
              </div>
            </ul>
            <p v-if="loading">loading...</p>
            <p v-if="noMore">No More</p>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "CoverDisplayPublic"
}
</script>

<style scoped>

</style>
