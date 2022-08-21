<template>
  <el-row :gutter="20">
    <el-col :span="12" :offset="6">
      <el-row :gutter="24" class="book_detail">
        <el-col :span="6">
          <el-image
              src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/action-thriller-book-cover-design-template-3675ae3e3ac7ee095fc793ab61b812cc.jpg?ts=1637008457"
              fit="fill"
          ></el-image>
        </el-col>
        <el-col :span="18" class="detail_header">
          <el-container>
            <el-header>
              <div>
                <!--                <h1 class="title">{{this.book_info.title}}</h1>-->
                <!--                <h2 class="subtitle">{{ book_info ? book_info.author.username : '' }}</h2>-->
                <h1>
                  {{ this.getCover.title ? "The King of Drugs" : "" }}
                </h1>
                <h2>
                  <!--                  {{ sliceString(this.getCover.owner) ? sliceString(this.getCover.owner) : "Test cover" }}-->
                </h2>
              </div>

            </el-header>
            <div class="short_des">
              <!--              <p>{{ this.book_info.description }}</p>-->
              <p>{{
                  this.getCover.description ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus mi vestibulum erat interdum, in convallis sapien convallis. Donec arcu massa, pulvinar ac ante id, fringilla venenatis augue. Nam vitae auctor mi, at facilisis lectus. Suspendisse potenti. Aenean convallis nisl justo, nec euismod tortor ornare tempus. " : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus mi vestibulum erat interdum, in convallis sapien convallis. Donec arcu massa, pulvinar ac ante id, fringilla venenatis augue. Nam vitae auctor mi, at facilisis lectus. Suspendisse potenti. Aenean convallis nisl justo, nec euismod tortor ornare tempus. "
                }}</p>
            </div>
            <el-divider></el-divider>
            <nav class="flex mb-6">
              <div class="w-1/4 ">
                <div>
                  <p class="heading">View</p>
                  <p class="title total_click_styple">100</p>
                </div>
              </div>
              <div class="w-1/4">
                <div>
                  <p class="heading">Rating</p>
                  <p class="title">6</p>
                </div>
              </div>
              <div class="w-1/4">
                <div>
                  <p class="heading">Likes</p>
                  <p class="title">120</p>
                </div>
              </div>
              <div class="w-1/4">
                <div>
                  <p class="heading">Chapters</p>
                  <p class="title">50</p>
                </div>
              </div>
            </nav>
            <el-divider>
              <el-footer class="book_button">
                <button type="button"
                        class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Start Reading
                </button>
              </el-footer>
            </el-divider>
          </el-container>
        </el-col>
      </el-row>
      <el-row :gutter="24" style="text-align: justify">
        <el-col>
          <el-main>

            <span>Table of content</span>
            <div v-if="chapterConfirmed && tableContent.length > 0">
              <div v-for="item in tableContent">
                <div class="w-1/4 text-center h-10 bg-amber-100 p-2 rounded">
                  <a @click="toChapter(item.transactionId)">{{ item.buffer.title }}</a>
                </div>
              </div>
            </div>
            <div v-else-if="chapterConfirmed && tableContent.length === 0">
              <h2>No chapter found...</h2>
            </div>
            <div v-else>
              <h2>Loading... Waiting for Arweave confirmation</h2>
            </div>
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
            <NFTDetail></NFTDetail>
          </el-main>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {mapGetters} from 'vuex';
import {getAccessTokenContract, getProviderOrSigner} from "../../utils/support.js";
import {searchArweave} from "../../arweave/arweave.js";
import NFTDetail from "./NFTDetail.vue";
import {ElMessageBox} from 'element-plus';


export default {
  name: "CoverDisplayPublic",
  components: {
    NFTDetail
  },
  data() {
    return {
      tableContent: [],
      isAccess: false,
      chapterConfirmed: false,
    }
  },
  computed: {
    ...mapGetters("wallet", ["getActiveAccount"]),
    ...mapGetters("cover", ["getCover"]),
    ...mapGetters("accessToken", ["getAccessToken", "getCurrentHolding"])
  },
  async created() {
    await this.$store.dispatch("cover/getSpecicCover", this.$route.params.id);
    this.$store.dispatch("accessToken/retrieveAccessToken", this.$route.params.id);
    await this.searchArweave();
    await this.checkAccess();
  },
  methods: {
    async searchArweave() {
      try{
        this.tableContent = await searchArweave(this.getCover.title);
        this.chapterConfirmed = true;
        console.log(this.tableContent.length);
      } catch (e) {
        this.chapterConfirmed = false;
      }
    },
    async checkAccess() {
      try {
        const provider = await getProviderOrSigner();
        const accessTokenContract = await getAccessTokenContract(provider);
        const result = await accessTokenContract.isOwner(
            this.getActiveAccount, this.$route.params.id
        );
        console.log(result);
        this.isAccess = result;
      } catch (e) {
        console.log(e);
      }
    },
    toChapter(transactionId) {
      this.checkAccess();
      if (this.isAccess) {
        this.$router.push({
          name: "chapter",
          params: {
            id: this.$route.params.id,
            chapterId: transactionId
          }
        });
      } else {
        ElMessageBox.alert('Please purchase a Access Token to read the content!', 'Title', {
          confirmButtonText: 'OK',
        })
      }
    }
  },
}
</script>

<style scoped>

</style>
