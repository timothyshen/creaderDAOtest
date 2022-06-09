<template>
  <h1>Register</h1>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="Title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="Short description">
      <el-input v-model="form.shortDescription"></el-input>
    </el-form-item>
    <el-form-item label="Short description">
      <el-input v-model="form.shortDescription"
                maxlength="200"
                show-word-limit
                type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="Cover image">
      <el-upload action="#" list-type="picture-card" :auto-upload="false">
        <el-icon><Plus /></el-icon>

        <template #file="{ file }">
          <div>
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
            <span class="el-upload-list__item-actions">
          <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
              v-if="!disabled"
              class="el-upload-list__item-delete"
              @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
          </div>
        </template>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button @click="registerTheCover(form)">Register</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  registerTheCover
} from "../utils/registerCover";

export default {
  name: "registerCover",
  data() {
    return {
      form: {
        title: '',
        shortDescription: '',
        longDescription: '',
      }
    }
  }
}
</script>

<style scoped>

</style>
