<template>
  <div class="miao">
    <h1>喵～欢迎来到 SU 的小窝！</h1>
    <p>这里是 SU 喵喵的个人角落，感谢你来找我玩～ฅ(=^･ω･^=)ฅ</p>
    <p>SU 是一只混血小狐喵，大概是 <b>30% 狐狸 + 70% 喵喵</b> 的可爱生物！</p>
    <p>喜欢可爱的东西，也超爱 FPS 游戏 —— 常玩 CS、Apex，还是个舟批兼马批喵～</p>
    <p>平时常用 ID：<b>SUX1NG</b>，或许你能在某个角落遇见我呢～ </p>
    <p>最近正在努力学习 <b>Vue3 + Element Plus</b>，正在制作一个属于自己的博客！</p>
  </div>
</template>

<style scoped>
.miao {
  background: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Comic Neue", "Noto Sans SC", "Poppins", sans-serif;
  color: #555;
  position: relative;
  overflow: hidden;
  padding: 2rem;
}

/* 外层柔和阴影容器效果 */
.miao::after {
  content: "";
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 3px dashed #ffd6e8;
  border-radius: 20px;
  opacity: 0.7;
  pointer-events: none;
}

/* 标题 */
h1 {
  font-size: 2.6rem;
  color: #ea8102;
  text-shadow: 0 0 6px rgba(255, 192, 203, 0.3);
  margin-bottom: 1.5rem;
}

/* 段落 */
p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1rem;
  background: rgba(255, 240, 245, 0.6);
  padding: 0.6rem 1rem;
  border-radius: 10px;
  display: inline-block;
  box-shadow: 0 2px 6px rgba(255, 192, 203, 0.15);
}

/* 轻柔浮动动画 */
p:nth-child(odd) {
  animation: float1 6s ease-in-out infinite;
}
p:nth-child(even) {
  animation: float2 5s ease-in-out infinite;
}

@keyframes float1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
}
@keyframes float2 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(5px); }
}
</style>

