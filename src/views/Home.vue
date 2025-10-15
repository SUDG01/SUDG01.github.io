<template>
    <div class="post-list">
        <h1>文章列表</h1>
        <el-card v-for="post in posts" :key="post.id" class="post-card">
            <template #header>
                <div class="card-header">
                    <router-link :to="'/post/'+ post.id">{{ post.frontmatter.title }}</router-link>
                </div>
            </template>
            <p>{{ post.frontmatter.excerpt }}</p>
            <small>发布于: {{ post.frontmatter.date }}</small>
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
.post-card {
    margin-bottom: 20px;
}
.card-header a{
    text-decoration: none;
    color: #409EFF;
    font-size: 18px
}
.card-header a:hover{
    text-decoration: underline;
}
</style>