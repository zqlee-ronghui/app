<template>
  <div>
    <h1>项目列表</h1>
    <el-table :data="items">
      <el-table-column prop="name" label="Name" width="250"></el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column prop="online" label="Mode" width="100" :formatter="formatMode"></el-table-column>
      <el-table-column prop="state" label="State" width="100" :formatter="formatState"></el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.state === 0">
            <el-button type="text" size="small" @click="onStart(scope.row._id)">开始</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" @click="onDelete(scope.row._id)">删除</el-button>
          </div>
          <div v-else-if="scope.row.state === 1">
            <el-button type="text" size="small" @click="onEnd(scope.row._id)">结束</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" @click="onDelete(scope.row._id)">删除</el-button>
          </div>
          <div v-else-if="scope.row.state === 2">
            <el-button type="text" size="small" @click="onPreview(scope.row._id)">预览</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" size="small" @click="onDownload(scope.row._id)">下载</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ProjectList",
  data() {
    return {
      items: []
    }
  },

  methods: {
    async fetch() {
      const res = await this.$http.get('/projects')
      this.items = res.data
    },
    formatMode(row, col, online) {
      if (online) {
        return "Online"
      } else {
        return "Offline"
      }
    },
    formatState(row, col, state) {
      if (state === 0) {
        return "待开始"
      } else if (state === 1) {
        return "进行中"
      } else {
        return "已完成"
      }
    },
    onStart(id) {
      this.$http.get(`/start/${id}`)
      this.fetch()
    },
    onEnd(id) {
      this.$http.get(`/end/${id}`)
      this.fetch()
    },
    onPreview(id) {
      this.$router.push(`/project/view/${id}`)
    },
    async onDownload(id) {
      console.log(id)
      // const res = await this.$http.get(`/download/${id}`, {responseType: 'blob'})
      // console.log('Download' + res.headers['content-disposition'].substr(21))
      // let url = window.URL.createObjectURL(new Blob([res.data]))
      // let link = document.createElement('a')
      // link.style.display = 'none'
      // link.href = url
      // link.setAttribute("download", res.headers['content-disposition'].substr(21))
      // document.body.appendChild(link)
      // link.click();

      const url = "/home/luoman/Downloads/2022-01-09-16-49-29_0.bag"

      ///
      // let a  = document.createElement('a')
      // a.href = url
      // a.click()

      ////
      window.open(url)

      /////
      // window.location.href = url

      ////
      // const a = document.createElement('a')
      // fetch(url).then(res => res.blob()).then(blob => {
      //   console.log(blob)
      //   a.href = URL.createObjectURL(blob)
      //   a.download = "aaa.txt" || ''
      //   document.body.appendChild(a)
      //   a.click()
      // })
    },
    onDelete(id) {
      this.$http.get(`/delete/${id}`)
      this.$message({
        type: 'success',
        message: 'success'
      })
      this.fetch()
    }
  },

  created() {
    this.fetch()
  }

}
</script>

<style scoped>

</style>