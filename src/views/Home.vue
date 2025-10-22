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

  <!-- 这里是介绍 -->
  <div class="information">
    <ProfileCard />
    
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { getAllPosts } from '../api/posts';
import ProfileCard from './ProfileCard.vue';



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
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}

.hero {
  position: relative;
  top: 0;
  left: 0;
  background-image: url('/2k-SU.jpg');
  max-width: 100%;
  height: 100vh;
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


.information {
  padding: 5px 10%;
  margin-top: 20px;
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

@media (max-width: 768px) {
  .hero {
    background-position: center center;
    max-width: 100%;
    background-size: contain;
  }

  .hero-content h1 {
    font-size: 1.8rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .information {
    padding: 10px 4%;
    margin-top: 10px;
  }

  /* 让 ProfileCard 垂直排列 */
  .profile-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .profile-card {
    width: 100%;
  }

  .top-post-card {
    flex-direction: column;
    align-items: center;
  }

  .top-post-card img {
    width: 100%;
    object-fit: cover;
  }

  .top-post-card > div {
    width: 100%;
    padding: 10px;
  }
}
</style>