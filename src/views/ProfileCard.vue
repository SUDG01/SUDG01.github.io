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
      <a v-for="post in topPosts" :key="post.id" :href="'#/post/' + post.id">
        <div class="top-post-card">
          <img v-lazy="post.frontmatter.cover" alt="" />
          <!-- 文章信息 -->
           <div class="post-content">
            <div>
              {{ post.frontmatter.title }}
            </div>
            <div>
              <span>{{ post.frontmatter.date }}</span>
            </div>
           </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getAllPosts } from '../api/posts';

const allPosts = ref(getAllPosts());
const topPosts = computed(() => allPosts.value.slice(0, 4));


import { h } from 'vue';


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
  background: #fff;
  border-radius: 12px;
  border: 1px solid rgba(230,230,230,0.6);
  overflow: hidden;
  flex: 1;
  transition: all 0.3s ease;
  min-height: 120px;
}

.top-post-card:hover {
  border-color: #ea8102;
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(255,182,193,0.2);
}

.top-post-card img {
  width: 20%;
  height: auto; /* 高度随内容 */
  object-fit: fill;
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
