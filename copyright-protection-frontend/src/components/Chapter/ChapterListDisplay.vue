<template>
  <el-row :gutter="20">
  <el-col :span="16" :offset="4">
    <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black text-left ">{{  }} chapters</h2>
    <el-divider></el-divider>
    <div>
      <el-row class="grid-content" :gutter="20">
        <el-col :span="8">
          <span class="item-span">Cover title</span>
          <h3 class="item-content">Jane's Patisserie Celebrate! (Hardback)</h3>
        </el-col>
        <el-col :span="8">
          <span class="item-span">Last Update</span>
          <h3 class="item-content">2019-01-01</h3>
        </el-col>
        <el-col class="item-button-group" :span="8">

          <button type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  @click="handleClick('cover_settings')">
            Edit
          </button>
          <button type="button"
                  class="text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            View
          </button>

        </el-col>
      </el-row>
      <el-row class="grid-content" :gutter="20">
        <el-col :span="8">
          <span class="item-span">Cover title</span>
          <h3 class="item-content">Jane's Patisserie Celebrate! (Hardback)</h3>
        </el-col>
        <el-col :span="8">
          <span class="item-span">Last Update</span>
          <h3 class="item-content">2019-01-01</h3>
        </el-col>
        <el-col class="item-button-group" :span="8">

          <button type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Edit
          </button>
          <button type="button"
                  class="text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            View
          </button>

        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="20">
        <el-col :offset="6" :span="12">
          <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black  ">You have no cover!</h2>
          <h2 class="font-medium leading-tight text-2xl mt-0 mb-2 ml-2 text-black  ">Why dont you start your author
            journey today!</h2>
          <button type="button"
                  class="w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
            Create
          </button>
        </el-col>
      </el-row>
    </div>
  </el-col>
</el-row>
</template>

<script>
export default {
  name: "ChapterListDisplay"
}
</script>

<style scoped>

</style>
