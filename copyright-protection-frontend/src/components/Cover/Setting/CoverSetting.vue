<template>
 <el-row :gutter="20">
   <el-col >
     <h1>{{}} Setting</h1>
     <el-form ref="form" :model="bookform" label-width="80px">
       <el-form-item label="Title">
         <el-input v-model="bookform.title"></el-input>
       </el-form-item>
       <el-form-item label="Short description">
         <el-input v-model="bookform.shortDescription"></el-input>
       </el-form-item>
       <el-button @click="handleUpdate()">
        Update
       </el-button>
       <el-divider></el-divider>
       <div>
         <CreateMembership></CreateMembership>
       </div>
       <div>

       </div>
     </el-form>
   </el-col>
 </el-row>
</template>

<script>
import CreateMembership from "./CreateMembership.vue";
import {ElMessageBox} from "element-plus";
export default {
  name: "CoverSetting",
  components: {CreateMembership},
  data() {
    return {
      bookform: {
        title: '',
        shortDescription: '',
        coverName:'',
      },
    };
  },
  computed:{
    data(){
      console.log(this.$route.params.id)
    },
  },
  methods: {
    handleUpdate() {

    },
    data(){
      console.log(this.$route.params.id)
    },
  },
}
</script>

<style scoped>

</style>
