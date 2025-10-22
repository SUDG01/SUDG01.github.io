<template>
    <section ref="post-section" class="post-section">
    <h1>文章列表</h1>
    <div class="post-list">
        <el-card v-for="post in posts" :key="post.id" class="post-card" shadow="hover">
            <template #header>
                <div class="card-header">
                    <router-link :to="'/post/'+ post.id">{{ post.frontmatter.title }}</router-link>
                </div>
            </template>
            <p class="excerpt">{{ post.excerpt }}</p>
            <small class="date">发布于: {{ post.frontmatter.date }}</small>
        </el-card>
    </div>
  </section>
</template>



<script setup>
import { ref } from 'vue';
import { getAllPosts } from '../api/posts';


const postsData = getAllPosts();
const posts = ref(postsData);

</script>




<style scoped>
.post-section {
  background-color: #fffafc;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  margin-top: 20px;
  padding: 60px 10%;
}

.post-section {
  background-color: #fffafc;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  margin-top: 20px;
  padding: 60px 10%;
  box-shadow: 0 -5px 20px rgba(255, 182, 193, 0.15);
}

.post-list h2 {
  font-size: 2.5rem;
  color: #ea8102;
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
  color: #ea8102;
  font-weight: bold;
  font-size: 20px;
  transition: 0.4s;
}
.card-header a:hover{
  color: #ffb6c1;
  text-shadow: 0 0 8px rgba(255, 182, 193, 0.8);
}

.excerpt {
  font-size: 14px;
  color: #555;
  margin: 16px 0;
}

.date {
  color: #888;
  font-size: 14px;
}

h1 {
  color: #000000;
  text-shadow: #555;
}
</style>