<template>
  <div>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="Name">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="请输入内容" v-model="model.description"></el-input>
      </el-form-item>
      <el-form-item label="Sate">
        <el-input v-model="model.state"></el-input>
      </el-form-item>
      <el-form-item label="Mode">
        <el-switch v-model="model.online" active-text="Online" inactive-text="Offline"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
const moment=require('moment')
export default {
  name: "ProjectEdit",
  data() {
    return {
      model: {
        name: "",
        description: "",
        online: true,
        state: 0
      }
    }
  },
  methods: {
    async save() {
      await this.$http.post('/create', this.model)
      this.$router.push('/project/list')
      this.$message({
        type: 'success',
        message: 'success'
      })
    }
  },
  created() {
    this.model.name = 'Project_' + moment().format('YYYY-MM-DD_HH:mm:ss')
  }
}
</script>

<style scoped>

</style>