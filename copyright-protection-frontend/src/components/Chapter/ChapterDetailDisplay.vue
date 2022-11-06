<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h3>Create a new book</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" v-model="bookform.title">
              </div>
              <div class="form-group">
                <label for="shortDescription">Content body</label>
                <input type="textarea" class="form-control" id="shortDescription" v-model="bookform.shortDescription">
              </div>
              <button type="submit" class="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChapterDetailDisplay"
}
</script>

<style scoped>

</style>
