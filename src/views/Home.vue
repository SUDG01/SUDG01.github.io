<template>
  <div class="home">
    <!-- 图片 -->
    <section class="hero">
      <div class="overlay"></div>
      <div class="hero-content">
        <h1>小猫不许哈气!</h1>
        <p class="typing">{{  displayedText  }}<span class="cursor">|</span></p> 
      </div>
    </section>
  </div>

  <section ref="post-section" class="post-section">
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
import { ref, onMounted } from 'vue';
import { getAllPosts } from '../api/posts';

const postsData = getAllPosts();
const posts = ref(postsData);

const messages = [
  '这里是喵喵的学习空间～',
  '正在加载猫猫能量...',
  'tips:背景是SU喵本喵哦～'
]

const displayedText = ref('')
let messageIndex = 0
let charIndex = 0
let isDeleting = false

const typingSpeed = 120
const deletingSpeed = 60
const pauseTime = 1000

function type() {
  const current = messages[messageIndex]
  if (!isDeleting && charIndex <= current.length) {
    displayedText.value = current.slice(0, charIndex++)
    setTimeout(type, typingSpeed)
  } else if (isDeleting && charIndex >= 0) {
    displayedText.value = current.slice(0, charIndex--)
    setTimeout(type, deletingSpeed)
  } else if (charIndex > current.length) {
    isDeleting = true
    setTimeout(type, pauseTime)
  } else if (charIndex < 0) {
    isDeleting = false
    messageIndex = (messageIndex + 1) % messages.length
    displayedText.value = ''
    charIndex = 0
    setTimeout(type, pauseTime/2)
  }
}

onMounted(() => {
  type()
})

</script>


<style scoped>
.home {
  font-family: "Comic Sans MS", "Microsoft YaHei", sans-serif;
  color: #444;
  background-color: #fffafc;
}

.hero {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url('/2k-SU.jpg');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0;
  padding: 0;
  overflow: hidden;
  position: relative;
}

.post-section {
  background-color: #fffafc;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  margin-top: -40px;
  padding: 60px 10%;
  box-shadow: 0 -5px 20px rgba(255, 182, 193, 0.15);
}


.hero-content {
  position: relative;
  z-index: 2;
  color: #fff;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  animation: fadeIn 1.0s ease;
  text-align: center;
}

.cursor {
  display: inline-block;
  animation: blink 0.8s step-end infinite;
}

.typing {
  display: inline-block;
  font-size: 1.4rem;
  white-space: nowrap;
  overflow: hidden;
  min-height: 2rem;
}

.hero-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero-content p {
  font-size: 1.4rem;
  margin-bottom: 2rem;
}


.post-list h2 {
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
  font-size: 14px;
  color: #555;
  margin: 16px 0;
}

.date {
  color: #888;
  font-size: 14px;
}


@keyframes blink {
  50% {
    opacity: 0;
  }
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