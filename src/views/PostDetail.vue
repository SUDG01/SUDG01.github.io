<template>
    <div v-if="post" class="post-detail">
        <el-page-header @back="goback" class="page-header">
            <template #content>
                <span class="text-large font-600 mr-3">文章详情</span>
            </template>
        </el-page-header>
        <el-divider />

        <h1>{{ post.frontmatter.title }}</h1>
        <div class="post-meta">
            <span>
                发布于：{{ post.frontmatter.date }}
            </span>
        </div>
        <!-- 核心修复：使用 v-html 渲染 HTML 内容，并使用 post.content 字段 -->
        <div class="post-content" v-html="post.content">
        </div>
    </div>
    <div v-else>
        <p>文章未找到TAT</p>
    </div>
</template>


<script setup>

import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getPostById } from '../api/posts';
// 只需要 getPostById，不需要 getAllPosts
// import { getAllPosts } from '../api/posts'; 

// 移除不需要的全局变量
// const postsData = getAllPosts(); 
// const posts = ref(postsData); 

const route = useRoute();
const router = useRouter();
const post = ref(null);

onMounted(()=>{
    // 核心修复：移除 Number() 转换，保持 postId 为字符串
    const postId = route.params.id; 
    post.value = getPostById(postId);
})

const goback = () => {
    router.back();
};

</script>

<style scoped>
/* 添加对渲染后 HTML 的样式，否则会很难看 */
.post-content :deep(h3) {
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}
.post-content :deep(pre) {
  background-color: #f4f4f4;
  padding: 15px;
  border-radius: 5px;
  overflow-x: auto;
}
.post-content :deep(code) {
  font-family: 'Courier New', Courier, monospace;
}
.post-content :deep(blockquote) {
  border-left: 4px solid #ccc;
  padding-left: 15px;
  color: #666;
  margin-left: 0;
}
.post-detail {
  max-width: 800px;
  margin: 0 auto;
}
.page-header {
  margin-bottom: 20px;
}
.post-meta {
  color: #909399;
  margin-bottom: 20px;
}
.post-content {
  line-height: 1.7;
}
</style>