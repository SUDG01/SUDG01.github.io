<template>
  <div class="archive-page">
    <el-header class="archive-header">
        <h1>归档</h1>
    </el-header>

    <el-timeline class="main-line">
        <el-timeline-item
        v-for="post in posts"
        :key="post.id"
        :timestamp="post.frontmatter.date"
        >
          <router-link :to="'/post/'+ post.id">{{ post.id }}</router-link>
        </el-timeline-item>
    </el-timeline>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { getAllPosts } from '../api/posts';

const postsData = getAllPosts();
const posts = ref(postsData);

</script>

<style scoped>
.archive-page {
  max-width: 800px; /* 页面宽度 */
  margin: 100px auto 60px auto; /* 居中 + 顶部间距 */
  padding: 0 20px;
}

.archive-header {
  text-align: center;
  margin-bottom: 40px;
}

.archive-header h1 {
  font-size: 32px;
  font-weight: bold;
  color: #ff82a9;
  text-shadow: 2px 2px 10px rgba(255, 182, 193, 0.4);
}

.main-line {
  margin-left: 20px; /* 微调时间线对齐 */
}

.el-timeline-item {
  font-size: 16px;
  line-height: 1.6;
  transition: all 0.3s ease;
}

.el-timeline-item:hover {
  transform: translateX(5px);
}

.el-timeline-item a {
  text-decoration: none; /* 去掉下划线 */
  color: inherit;         /* 使用父元素颜色，如果想单独颜色可以改成你想要的 */
  transition: color 0.3s;
}

.el-timeline-item a:hover {
  color: #ea7e02;         /* 悬停颜色 */
}

</style>