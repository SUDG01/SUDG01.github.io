<template>
  <div class="app-wrapper">
    
    <div class="cat-bg">
      <div class="bubble bubble-1" :style="bubbleStyle"></div>
      <div class="bubble bubble-2" :style="bubbleStyle2"></div>
    </div>

    <div class="paw-trail-container" ref="pawContainerRef"></div>

    <el-container class="app-container">
      <el-header :class="['header',{ 'scrolled': isScrolled }]">
        <router-link to="/" class="logo">
          SU的小窝～
        </router-link>
        
        <el-menu mode="horizontal" router class="menu" background-color="transparent" :ellipsis="false">
          
          <div class="flex-grow" />

          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/posts">文章</el-menu-item>
          <el-menu-item index="/timeline">归档</el-menu-item>
          <el-menu-item index="/about">关于我</el-menu-item>

          <li class="el-menu-item admin-btn" @click="goToAdmin">⚙️</li>
        </el-menu>
      </el-header>

      <el-main class="main">
        <router-view />
      </el-main>

      <el-footer class="footer">
        Copyright© 2025 苏星 | Powered by Vue3 + Django
      </el-footer>
    </el-container>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const goToAdmin = () => {
  const adminUrl = import.meta.env.VITE_ADMIN_URL;
  if (adminUrl) {
    window.open(adminUrl, '_blank');
  } else {
    console.error('喵～还没有设置后台地址哦～');
    alert("在.env文件设置喵")
  }
};

const isScrolled = ref(false);
const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

// 背景视差
const mouseX = ref(0);
const mouseY = ref(0);
const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const handleMouseMoveBg = (e) => {
  mouseX.value = (e.clientX / windowWidth.value) * 2 - 1;
  mouseY.value = (e.clientY / windowHeight.value) * 2 - 1;
};

const bubbleStyle = computed(() => ({
  transform: `translate(${mouseX.value * -20}px, ${mouseY.value * -20}px)`
}));
const bubbleStyle2 = computed(() => ({
  transform: `translate(${mouseX.value * -10}px, ${mouseY.value * -10}px)`
}));

// 猫爪特效
const pawContainerRef = ref(null);
let lastPawTime = 0;

const createPaw = (x, y) => {
  if (!pawContainerRef.value) return;
  const paw = document.createElement('div');
  paw.className = 'paw-print';
  const icons = ['qwq', 'ovo', '>w<', '^o^', 'nya', '🐾'];
  paw.innerText = icons[Math.floor(Math.random() * icons.length)];
  
  const size = Math.random() * 10 + 15; 
  const rotation = Math.random() * 60 - 30; 
  
  paw.style.fontSize = `${size}px`;
  paw.style.left = `${x}px`;
  paw.style.top = `${y}px`;
  paw.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  
  const colors = ['#ffb6c1', '#ffc0cb', '#ea8102', '#ff82a9']; 
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  paw.style.color = randomColor;

  pawContainerRef.value.appendChild(paw);
  setTimeout(() => { paw.remove(); }, 1200);
}

const handleMouseMovePaw = (e) => {
  const currentTime = Date.now();
  if (currentTime - lastPawTime > 100) {
    createPaw(e.clientX, e.clientY);
    lastPawTime = currentTime;
  }
};

const updateWindowSize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('mousemove', handleMouseMoveBg);
  window.addEventListener('mousemove', handleMouseMovePaw);
  window.addEventListener('resize', updateWindowSize);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('mousemove', handleMouseMoveBg);
  window.removeEventListener('mousemove', handleMouseMovePaw);
  window.removeEventListener('resize', updateWindowSize);
});
</script>

<style>
/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  font-family: "Comic Neue", "Noto Sans SC", "Segoe UI", sans-serif;
  background-color: #fffafc;
  overflow-x: hidden;
}

.app-wrapper {
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* 背景层 */
.cat-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(180deg, #fffafc 0%, #fff0f5 100%);
}

.bubble {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  transition: transform 0.2s ease-out;
}
.bubble-1 { top: -10%; left: -10%; width: 50vw; height: 50vw; background: #ffe4e1; }
.bubble-2 { bottom: -10%; right: -10%; width: 40vw; height: 40vw; background: #fff0f5; }

/* 爪印层 */
.paw-trail-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  pointer-events: none;
}

.paw-print {
  position: absolute;
  pointer-events: none;
  opacity: 0.6;
  animation: pawFade 1.2s ease-out forwards;
  filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.8));
}

@keyframes pawFade {
  0% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.5); }
  20% { transform: translate(-50%, -50%) scale(1.2); }
  100% { opacity: 0; transform: translate(-50%, -30px) scale(1); }
}

/* App 容器 */
.app-container {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s ease;
  z-index: 100;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: none;
  backdrop-filter: blur(5px);
}

.header.scrolled {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 12px rgba(255, 182, 193, 0.2);
}

.logo {
  text-decoration: none;
  font-size: 24px;
  font-weight: bold;
  color: #ea8102;
  text-shadow: 0 0 6px rgba(255, 192, 203, 0.7);
  transition: transform 0.3s;
  padding-left: 20px;
  margin-right: 20px;
}
.logo:hover { transform: scale(1.1) rotate(5deg); }

/* 菜单样式 */
.menu {
  border: none;
  background: transparent;
  flex: 1;
  width: 100%; 
  display: flex;
  border-bottom: none !important;
}

/* 垫片样式：关键！ */
.flex-grow {
  flex-grow: 1; /* 占满所有剩余空间 */
}

.admin-btn {
  font-size: 1.2rem;
  opacity: 0.6;
  transition: 0.3s;
  padding: 0 15px !important;
}
.admin-btn:hover {
  opacity: 1;
  transform: rotate(90deg);
  background-color: transparent !important;
}

.el-menu-item {
  font-weight: bold;
  color: #ff82a9;
  text-shadow: 0 0 6px rgba(255, 192, 203, 0.7);
  transition: transform 0.3s;
  background: transparent !important;
}

.el-menu-item.is-active {
  border-bottom: 2px solid #ff82a9;
  background: transparent !important;
}

.el-menu-item:hover {
  background-color: rgba(255, 182, 193, 0.2) !important;
  color: #ff4fa3 !important;
  transform: translateY(-2px);
  border-radius: 10px;
}

.main {
  overflow-x: hidden;
  flex: 1;
  animation: fadeIn 0.8s ease;
  width: 100%;
  padding-top: 0; 
}

.footer {
  text-align: center;
  color: #888;
  font-size: 14px;
  border-top: 1px solid rgba(255, 182, 193, 0.3);
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(8px);
  padding: 20px 0;
  margin-top: auto;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>