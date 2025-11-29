<template>
    <div v-if="post" class="post-detail">
        <el-page-header @back="goback" class="page-header">
            <template #content>
                <span class="text-large font-600 mr-3">笔记详情</span>
            </template>
        </el-page-header>
        <el-divider />

        <div class="post-meta">
            <span>
                发布于：{{ post.date }}
            </span>
        </div>
        <div class="post-content" v-html="post.content">
        </div>
    </div>

    <div v-else-if="loading">
      <el-skeleton :rows="10" animated />
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
const loading = ref(true);

onMounted(async ()=>{
    const postId = route.params.id; 
    post.value = await getPostById(postId);
    loading.value = false;
})

const goback = () => {
    router.back();
};

</script>

<style scoped>
/* 外层容器：磨砂玻璃效果 */
.post-detail {
  padding-top: 80px; /* 留出顶部空间 */
  margin: 40px auto;
  max-width: 900px; /* 稍微窄一点，阅读体验更好 */
  
  /* 核心：磨砂玻璃特效 */
  background: rgba(255, 255, 255, 0.85); 
  backdrop-filter: blur(12px); /* 背景模糊 */
  -webkit-backdrop-filter: blur(12px);
  
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 8px 32px rgba(255, 182, 193, 0.15); /* 柔和的阴影 */
  padding: 40px 50px;
}

/* 标题样式 */
h1 {
  font-size: 2.2rem;
  color: #333;
  text-align: center;
  margin-bottom: 10px;
}

.post-meta {
  text-align: center;
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 40px;
  border-bottom: 1px dashed #eee;
  padding-bottom: 20px;
}

/* === Markdown 正文美化 === */
.post-content {
  line-height: 1.8; /* 增加行高，阅读不累 */
  font-size: 1.05rem;
  color: #444;
}

/* 标题装饰 */
.post-content :deep(h2) {
  font-size: 1.5rem;
  margin-top: 40px;
  margin-bottom: 20px;
  padding-left: 12px;
  border-left: 5px solid #ff82a9; /* 左侧粉色竖线 */
  color: #333;
}

.post-content :deep(h3) {
  font-size: 1.3rem;
  margin-top: 30px;
  color: #ba6f86;
  font-weight: bold;
}

/* 代码块美化 */
.post-content :deep(pre) {
  background: #282c34; /* 深色背景 */
  color: #abb2bf;
  padding: 20px;
  border-radius: 12px;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', monospace;
  margin: 20px 0;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.post-content :deep(code) {
  background: #fff0f5; /* 行内代码浅粉色背景 */
  color: #d63384;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

/* 引用块美化 */
.post-content :deep(blockquote) {
  margin: 20px 0;
  padding: 16px 20px;
  background: #fdf2f5;
  border-left: 4px solid #ffb6c1;
  color: #666;
  border-radius: 0 8px 8px 0;
}

/* 图片自适应 */
.post-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  display: block;
}

/* 链接样式 */
.post-content :deep(a) {
  color: #ff82a9;
  text-decoration: none;
  border-bottom: 1px dashed #ff82a9;
  transition: all 0.3s;
}
.post-content :deep(a:hover) {
  color: #ea7e02;
  border-bottom: 1px solid #ea7e02;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .post-detail {
    padding: 20px;
    margin: 20px 10px;
  }
}
</style>