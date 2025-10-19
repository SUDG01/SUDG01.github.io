<template>
    <div miao>
        <h1>关于SU喵喵</h1>
        <p>欢迎来到SU小喵的个人博客～</p>
        <p>SU是一个小狐喵，大概是30%的狐狸+70%的喵喵</p>
        <p>是一个furry，也是一个fps Lover 常玩cs，apex，还是个舟批兼马批</p>
        <p>社区常用id:SUX1NG   或许能在某些地方搜到我～</p>
        <p>正在尝试学习使用vue3 + element plus 制作一个个人博客～</p>
    </div>
</template>



<style scoped>
/* 背景渐变色 */
.miao {
  background: linear-gradient(135deg, #f5b7b1, #d5a6bd);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: #fff;
  position: relative;
  overflow: hidden;
}


/* 标题样式 */
h1 {
  font-size: 3rem;
  text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
}

/* 段落文字样式 */
p {
  font-size: 1.5rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

/* 动画效果 */
@keyframes twinkling {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 0.7;
  }
}

</style>