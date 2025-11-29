<template>
  <section class="post-section">
    <div class="section-header">
      <h1>文章列表</h1>
      <div class="decoration-line"></div>
    </div>

    <div v-if="loading" class="loading-container">
      <el-skeleton :rows="3" animated class="skeleton-item" v-for="i in 3" :key="i" />
    </div>

    <div v-else class="post-list">
      <el-card 
        v-for="(post, index) in posts" 
        :key="post.id" 
        class="post-card" 
        shadow="hover"
        :body-style="{ padding: '0px' }" 
        :style="{ animationDelay: `${index * 0.1}s` }" 
      >
        <div class="card-body" @click="goToPost(post.id)">
          
          <div class="cover-wrapper">
            <img 
                :src="post.cover || '/default-cover.jpg'" 
                class="post-cover" 
                alt="cover" 
            />
          </div>

          <div class="content-wrapper">
            <div class="content-main">
              <h2 class="post-title">
                {{ post.title }}
              </h2>
              <p class="excerpt">{{ post.excerpt }}</p>
            </div>
            
            <div class="card-footer">
              <div class="date-tag">
                {{ post.date }}
              </div>
              <span class="read-more">阅读全文 &rarr;</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; // 引入 router 用于跳转
import { getAllPosts } from '../api/posts';

const posts = ref([]);
const loading = ref(true);
const router = useRouter();

// 点击卡片跳转函数
const goToPost = (id) => {
    router.push(`/post/${id}`);
};

onMounted(async () => {
  try {
    const data = await getAllPosts();
    posts.value = data;
  } catch(error) {
    console.error("加载文章失败", error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 300);
  }
})
</script>

<style scoped>
/* --- 布局容器 (保持不变) --- */
.post-section {
  background: linear-gradient(180deg, #fffafc 0%, #fff 100%);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  margin-top: 20px;
  padding: 60px 10%;
  min-height: 80vh;
  box-shadow: 0 -10px 30px rgba(255, 182, 193, 0.1);
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;
}

.decoration-line {
  width: 60px;
  height: 4px;
  background: #ffb6c1;
  border-radius: 2px;
  margin: 0 auto;
  transition: width 0.3s ease;
}

.section-header:hover .decoration-line {
  width: 100px;
}

/* --- 骨架屏 --- */
.loading-container {
  max-width: 900px;
  margin: 0 auto;
}
.skeleton-item {
  margin-bottom: 30px;
  padding: 20px;
  background: #fff;
  border-radius: 20px;
}

/* --- 卡片整体样式 --- */
.post-list {
  max-width: 900px;
  margin: 0 auto;
}

.post-card {
  margin-bottom: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(234, 129, 2, 0.05);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  opacity: 0;
  transform: translateY(30px);
  animation: slideUp 0.6s ease forwards;
  cursor: pointer; /* 鼠标变手型 */
}

@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(255, 182, 193, 0.3);
  border-color: #ffb6c1;
}

/* --- 核心布局：左图右文 --- */
.card-body {
  display: flex;
  height: 220px; /* 固定卡片高度，保证整齐 */
}

/* 左侧封面容器 */
.cover-wrapper {
  flex: 0 0 35%; /* 左侧占 35% 宽度，固定 */
  overflow: hidden; /* 防止图片放大溢出 */
  position: relative;
}

.post-cover {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 关键：保证图片填满且不变形 */
  transition: transform 0.6s ease;
}

/* 悬停时图片缓慢放大 */
.post-card:hover .post-cover {
  transform: scale(1.08);
}

/* 右侧内容容器 */
.content-wrapper {
  flex: 1; /* 占满剩余空间 */
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 让底部信息贴底 */
}

.post-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  transition: color 0.3s;
  /* 限制标题行数 */
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card:hover .post-title {
  color: #ea8102;
}

.excerpt {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  /* 限制摘要行数 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 底部区域 */
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}

.date-tag {
  background: #fff0f5;
  color: #ba6f86;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}

.read-more {
  color: #ea8102;
  font-weight: bold;
  font-size: 0.9rem;
  transition: transform 0.3s;
}

.post-card:hover .read-more {
  transform: translateX(5px);
}

/* --- 移动端适配 --- */
@media (max-width: 768px) {
  .post-section {
    padding: 40px 5%;
  }

  /* 手机上变成 上图下文 */
  .card-body {
    flex-direction: column;
    height: auto; /* 高度自适应 */
  }

  .cover-wrapper {
    flex: none;
    width: 100%;
    height: 180px; /* 手机上图片的高度 */
  }

  .content-wrapper {
    padding: 20px;
  }

  .post-title {
    font-size: 1.3rem;
  }
}
</style>