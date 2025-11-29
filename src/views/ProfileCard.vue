<template>
  <div class="profile-wrapper">
    <div class="profile-card">
      <img class="avatar" v-lazy="avatar" alt="头像" />
      <div class="info">
        <h2>{{ name }}</h2>
        <p>{{ description }}</p>

        <div class="social-links">
          <a
            v-for="link in links"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="icon"
            :title="link.name"
          >
            <component :is="link.icon" class="svg-icon" />
          </a>
        </div>
      </div>
    </div>

    <!-- 以下是置顶文章 -->
    <div class="top-posts">
      <div v-if="loading" style="padding: 20px; color: #888;">正在加载文章...</div>

      <a v-for="post in topPosts" :key="post.id" :href="'#/post/' + post.id">
        <div class="top-post-card">
          <img v-lazy="post.cover" alt="" />
          <!-- 文章信息 -->
           <div class="post-content">
            <div>
              {{ post.title }}
            </div>
            <div>
              <span>{{ post.date }}</span>
            </div>
           </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, h } from 'vue';
import { getAllPosts } from '../api/posts';

const allPosts = ref([])
const loading = ref(true);

const topPosts = computed(() => allPosts.value.slice(0, 4));

onMounted(async () => {
  const data = await getAllPosts();
  allPosts.value = data;
  loading.value = false;
})


const avatar = '/avatar.png';

const name = 'SUX1NG';
const description = 'furry,fps玩家,大学生';

const links = [
  {
    name: 'Bilibili',
    url: 'https://space.bilibili.com/484771916',
    icon: {
      render: () => h('img', {src:'/bilibili-color.svg', class: 'w-6 h-6'}),
    },
  },
  {
    name: 'GitHub',
    url: 'https://github.com/SUDG01',
    icon: {
      render: () => h('img', {src:'/github.svg', class: 'w-6 h-6'}),
    }
  },
];
</script>

<style scoped>
.top-up {
  position: relative;
  z-index: 2;
  color: #ea8102;
  text-shadow: 2px 2px 6px rgba(253, 154, 154, 0.4);
  animation: fadeIn 1.0s ease;
  text-align: left;
}

.top-post-card {
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 0.9); /* 稍微透明一点 */
  backdrop-filter: blur(5px); /* 磨砂效果 */
  border-radius: 16px; /* 更圆润的角 */
  border: 1px solid rgba(255, 255, 255, 0.5);
  overflow: hidden;
  flex: 1;
  min-height: 120px;
  height: 100%;
  
  /* 关键：过渡动画 */
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.top-post-card:hover {
  /* 上浮 */
  transform: translateY(-8px); 
  /* 发光阴影 */
  box-shadow: 0 12px 24px rgba(255, 130, 169, 0.25); 
  border-color: #ffb6c1;
}

.top-post-card img {
  width: 30%;
  height: auto;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.top-post-card:hover img {
  transform: scale(1.05); /* 图片微微放大 */
}

.top-post-card > div {
  width: 50%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
}

.top-post-card > div > div:first-child {
  font-size: 18px;
  font-weight: bold;
  color: #000000;
}

.top-post-card > div > div:last-child {
  font-size: 14px;
  color: #888;
}

.profile-wrapper {
  display: flex;
  gap: 20px; /* 或者你想要的间距 */
  align-items: stretch;
}

.top-posts {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  flex: 1;
}

.top-posts h3 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.profile-card {
  min-width: 220px;
  height: auto;
  box-sizing: border-box;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid rgba(230, 230, 230, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(255, 182, 193, 0.2);
}

.profile-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(255, 182, 193, 0.4);
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
}

.info {
  margin-top: 10px;
  text-align: center;
}

.info h2 {
  font-size: 20px;
  font-weight: bold;
  color: #ff82a9;
}

.info p {
  font-size: 15px;
  color: #888;
  margin-top: 4px;
}

.social-links {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 8px;
}

.icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.icon:hover {
  background: #ffe6f0;
  transform: scale(1.1);
}

.svg-icon {
  width: 22px;
  height: 22px;
}

.post-content {
  width: 50%;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

a {
  text-decoration: none;
}
</style>
