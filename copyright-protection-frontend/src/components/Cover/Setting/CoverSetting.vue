<template>
 <div>
   <div>
     <h1>{{}} Setting</h1>
     <el-form ref="form" :model="bookform" label-width="80px">
       <el-form-item label="Title">
         <el-input v-model="bookform.title"></el-input>
       </el-form-item>
       <el-form-item label="Short description">
         <el-input v-model="bookform.shortDescription"></el-input>
       </el-form-item>

     </el-form>
   </div>
 </div>
</template>

<script>
export default {
  name: "CoverSetting"
}
</script>

<style scoped>

</style>
