<template>
    <div v-if="post" class="post-detail">
        <el-page-header @back="goback" class="page-header">
            <template #content>
                <span class="text-large font-600 mr-3">文章详情</span>
            </template>
        </el-page-header>
        <el-divider />

        <div class="post-meta">
            <span>
                发布于：{{ post.frontmatter.date }}
            </span>
        </div>
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


const route = useRoute();
const router = useRouter();
const post = ref(null);

onMounted(()=>{
    const postId = route.params.id; 
    post.value = getPostById(postId);
})

const goback = () => {
    router.back();
};

</script>

<style scoped>
.post-content :deep(h1),
.post-content :deep(h2),
.post-content :deep(h3) {
  color: #ba6f86;
}

.post-content :deep(h3) {
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}
.post-content :deep(pre) {
  background-color: #fdf0f5;
  padding: 15px;
  border-radius: 10px;
  overflow-x: auto;
}
.post-content :deep(code) {
  background: #ffe6f0;
  padding: 2px 5px;
  border-radius: 5px;
}
.post-content :deep(blockquote) {
  border-left: 4px solid #ccc;
  padding-left: 15px;
  color: #666;
  margin-left: 0;
}
.post-detail {
  padding-top: 120px;
  margin-top: 80px;
  max-width: 1280px;
  margin: 20px auto;
  background: rgba(255, 255, 255, 0.85); /* 浅色背景 */
  padding: 30px 25px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(255, 182, 193, 0.2); /* 二次元柔和阴影 */
}
.page-header {
  margin-top: 20px;
  margin-bottom: 25px;
}
.post-meta {
  color: #909399;
  margin-bottom: 20px;
}
.post-content {
  line-height: 1.7;
}

.main {
  padding-top: 100px; 
}
</style>