<template>
  <el-container class="app-container">
    <el-header class="header">
      <div class="logo">SU的小窝～</div>
      <el-menu mode="horizontal" router class="menu" background-color="transparent">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/About">关于我</el-menu-item>
      </el-menu>
    </el-header>

    <el-main class="main">
      <router-view></router-view>
    </el-main>

    <el-footer class="footer">
      © 2025 SUX1NG的小窝 🐾 | Powered by Vue3 + Element Plus
    </el-footer>
  </el-container>
</template>


<script>
//setup
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Comic Neue", "Noto Sans SC", "Segoe UI", sans-serif;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 40px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border-bottom: 2px solid rgba(255, 182, 193, 0.4);
  box-shadow: 0 4px 10px rgba(255, 182, 193, 0.2);
  border-radius: 0 0 20px 20px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: #ff82a9;
  text-shadow: 0 0 6px rgba(255, 192, 203, 0.7);
  transition: transform 0.3s;
}

.logo:hover {
  transform: scale(1.1) rotate(2deg);
}

.footer {
  text-align: center;
  color: #909399;
  border-top: 1px solid #e4e7ed;
  padding-top: 20px;
  margin-top: 20px;
}

.menu {
  border: none;
  background: transparent;
}

.el-menu-item:hover {
  background-color: rgba(255, 182, 193, 0.3) !important;
  color: #ff4fa3 !important;
  transform: translateY(-2px);
  box-shadow: 0 0 10px rgba(255, 182, 193, 0.5);
}

.main {
  flex: 1;
  padding: 20px;
  animation: fadeIn 0.8s ease;
}

.footer {
  text-align: center;
  color: #666;
  font-size: 14px;
  border-top: 1px solid rgba(255, 182, 193, 0.3);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  padding: 15px 0;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 8px rgba(255, 182, 193, 0.2);
}

.el-main {
  min-height: calc(100vh - 122px);
}
</style>