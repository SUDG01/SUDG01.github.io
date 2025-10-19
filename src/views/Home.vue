<template>
    <div class="post-list">
        <h1>文章列表</h1>
        <el-card v-for="post in posts" :key="post.id" class="post-card" shadow="hover">
            <template #header>
                <div class="card-header">
                    <router-link :to="'/post/'+ post.id">{{ post.frontmatter.title }}</router-link>
                </div>
            </template>
            <p class="excerpt">{{ post.frontmatter.excerpt }}</p>
            <small class="date">发布于: {{ post.frontmatter.date }}</small>
        </el-card>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { getAllPosts } from '../api/posts';

const postsData = getAllPosts();
const posts = ref(postsData);

</script>


<style scoped>

.post-list h1 {
  font-size: 2.5rem;
  color: #ba6f86;
  margin-bottom: 30px;
  text-shadow: 0 3px 6px rgba(255, 182, 193, 0.4);
  animation: fadeIn 1s ease;
}

.post-card {
  width: 100%;
  margin-bottom: 25px;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(255, 182, 193, 0.4);
}

.card-header a{
  text-decoration: none;
  color: #ff82a9;
  font-weight: bold;
  font-size: 20px;
  transition: 0.4s;
}
.card-header a:hover{
  color: #ffb6c1;
  text-shadow: 0 0 8px rgba(255, 182, 193, 0.8);
}

.excerpt {
  color: #333;
  font-size: 16px;
  line-height: 1.7;
  margin: 10px 0;
}

.date {
  color: #888;
  font-size: 14px;
}


@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>