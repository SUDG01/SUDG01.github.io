<template>
  <div class="archive-wrapper">
    <div class="archive-container">
      
      <div class="archive-header">
        <h1>归档</h1>
        <div class="decoration-line"></div>
        <p class="subtitle">记录每一刻的学习与生活</p>
      </div>

      <div v-if="loading" class="loading-box">
        <el-skeleton :rows="5" animated />
      </div>

      <el-timeline v-else class="main-line">
        <el-timeline-item
          v-for="(post, index) in posts"
          :key="post.id"
          :timestamp="post.date"
          placement="top"
          :color="index === 0 ? '#ea8102' : '#ffb6c1'"
          :hollow="index === 0"
          :size="index === 0 ? 'large' : 'normal'"
          class="animate-item"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="timeline-card" @click="goToPost(post.id)">
            <router-link :to="'/post/'+ post.id" class="post-link">
              {{ post.title }}
            </router-link>
            <span class="arrow-icon">🌸</span>
          </div>
        </el-timeline-item>
      </el-timeline>
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAllPosts } from '../api/posts';

const posts = ref([]);
const loading = ref(true);
const router = useRouter();

const goToPost = (id) => {
  router.push(`/post/${id}`);
}

onMounted(async () => {
  try {
    const data = await getAllPosts();
    posts.value = data;
  } catch (error) {
    console.error("归档页获取数据失败", error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  }
});
</script>

<style scoped>
/* 最外层包装，用于撑开高度和背景 */
.archive-wrapper {
  padding: 40px 20px;
  min-height: 80vh;
}

/* 核心磨砂容器 */
.archive-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px 40px;
  background: rgba(255, 255, 255, 0.75); /* 半透明白 */
  backdrop-filter: blur(12px);           /* 磨砂效果 */
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 40px rgba(255, 182, 193, 0.15);
}

/* 头部样式 */
.archive-header {
  text-align: center;
  margin-bottom: 50px;
}

.archive-header h1 {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 10px;
}

.decoration-line {
  width: 50px;
  height: 4px;
  background: #ffb6c1;
  border-radius: 2px;
  margin: 0 auto 15px auto;
  transition: width 0.3s ease;
}

.archive-container:hover .decoration-line {
  width: 120px; /* 鼠标悬停变长 */
}

.subtitle {
  color: #999;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

/* 骨架屏 */
.loading-box {
  padding: 20px;
}

/* 时间轴样式 */
.main-line {
  padding-left: 10px;
}

/* 单个时间节点的卡片 */
.timeline-card {
  background: #fff;
  padding: 15px 20px;
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* 鼠标悬停在卡片上 */
.timeline-card:hover {
  transform: translateX(10px);
  border-color: #ffb6c1;
  box-shadow: 0 4px 15px rgba(255, 182, 193, 0.3);
  background: #fffafc; /* 微微粉 */
}

.timeline-card:hover .arrow-icon {
  transform: rotate(45deg) scale(1.2);
  opacity: 1;
}

/* 链接文字 */
.post-link {
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: bold;
  color: #555;
  transition: color 0.3s;
}

.timeline-card:hover .post-link {
  color: #ea8102;
}

/* 右侧的小装饰图标 */
.arrow-icon {
  font-size: 1.2rem;
  opacity: 0.6;
  transition: all 0.3s;
}

/* 入场动画 */
.animate-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.6s forwards;
}

@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 深度选择器：修改 Element Plus 时间轴原生的时间戳颜色 */
:deep(.el-timeline-item__timestamp) {
  color: #ba6f86;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .archive-container {
    padding: 30px 20px;
  }
  .archive-header h1 {
    font-size: 1.8rem;
  }
}
</style>