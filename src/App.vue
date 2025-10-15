<template>
  <el-container>
    <el-header class="header">
      <div class="logo">SU的小窝～</div>
      <el-menu mode="horizontal" router>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/About">关于我</el-menu-item>
      </el-menu>
    </el-header>

    <el-main>
      <router-view></router-view>
    </el-main>

    <el-footer class="footer">
      @ 2025 copyright by SUX1NG
    </el-footer>
  </el-container>
</template>


<script>
//setup
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e4e7ed;
}
.logo {
  font-size: 20px;
  font-weight: bold;
}
.footer {
  text-align: center;
  color: #909399;
  border-top: 1px solid #e4e7ed;
  padding-top: 20px;
  margin-top: 20px;
}
.el-main {
  min-height: calc(100vh - 122px);
}
</style>