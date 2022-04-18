<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-container>
      <el-header style="text-align: left; font-size: 24px">
        <el-menu router mode="horizontal">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-office-building"></i> 项目</template>
            <el-menu-item index="/project/create">新建项目</el-menu-item>
            <el-menu-item index="/project/list">项目列表</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  },
  created() {
    const timestamp = Date.now();
    console.log(timestamp);
    this.$http.get(`/align_time/${timestamp}`)
  }
};
</script>
