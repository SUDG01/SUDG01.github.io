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
    </div>
</template>

<script setup>

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
</style>