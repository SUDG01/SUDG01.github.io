<template>
  <div class="about-wrapper">
    <div class="glass-card">
      
      <div class="avatar-box">
        <img src="/avatar.png" alt="SU Avatar" class="avatar" />
        <div class="status-badge">✨ 营业中</div>
      </div>

      <h1 class="title">
        <span class="highlight">SU</span> 的小窝
        <span class="paw">🐾</span>
      </h1>
      <p class="subtitle">一只正在努力敲代码的混血小狐喵 🦊🐱</p>

      <el-divider border-style="dashed" class="divider">
        <span style="color: #ffb6c1;">About Me</span>
      </el-divider>

      <div class="content-section">
        
        <div class="info-block">
          <h3>🧬 种族成分</h3>
          <div class="fox-cat-bar">
            <div class="bar-fox">30% 狐狸</div>
            <div class="bar-cat">70% 喵喵</div>
          </div>
        </div>

        <div class="info-block">
          <h3>🎮 游戏成分</h3>
          <div class="tags-group">
            <el-tag effect="light" color="#fff0f5" class="custom-tag">CS / Apex</el-tag>
            <el-tag effect="light" color="#e6f7ff" class="custom-tag">Arknights</el-tag>
            <el-tag effect="light" color="#fff7e6" class="custom-tag">UmaMusume</el-tag>
            <el-tag effect="light" color="#f9f0ff" class="custom-tag">🆔 SUX1NG</el-tag>
          </div>
        </div>

        <div class="info-block">
          <h3>💻 正在折腾</h3>
          <p class="tech-text">
            正在用 <span class="tech-highlight">Vue3</span> + <span class="tech-highlight">Django</span> 
            搭建这个小窝，目标是成为全栈喵喵！
          </p>
        </div>

        <div class="message-box">
          “ 感谢你来找我玩，或许我们能在互联网的某个角落相遇～ ”
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* 外层容器：用于居中和留白 */
.about-wrapper {
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

/* 核心磨砂玻璃卡片 */
.glass-card {
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.65); /* 半透明白 */
  backdrop-filter: blur(16px);           /* 强磨砂 */
  -webkit-backdrop-filter: blur(16px);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 20px 50px rgba(255, 182, 193, 0.25);
  padding: 40px;
  text-align: center;
  position: relative;
  overflow: hidden;
  animation: popIn 0.8s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

/* 头像区域 */
.avatar-box {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 8px 20px rgba(255, 160, 122, 0.3);
  transition: transform 0.5s ease;
}

.avatar:hover {
  transform: rotate(10deg) scale(1.1);
}

/* 状态小徽章 */
.status-badge {
  position: absolute;
  bottom: 0;
  right: -10px;
  background: #ff82a9;
  color: #fff;
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 20px;
  border: 2px solid #fff;
  animation: floatBadge 3s ease-in-out infinite;
}

/* 标题样式 */
.title {
  font-size: 2rem;
  color: #333;
  margin-bottom: 5px;
}

.highlight {
  color: #ea8102;
  font-family: 'Comic Sans MS', sans-serif;
}

.paw {
  display: inline-block;
  animation: wave 2s infinite;
  transform-origin: 70% 70%;
}

.subtitle {
  color: #888;
  margin-bottom: 20px;
}

/* 分割线颜色 */
.divider :deep(.el-divider__text) {
  background-color: transparent; /* 让文字背景透明，透出磨砂 */
  font-weight: bold;
  font-size: 1.1rem;
}

/* 内容区块 */
.info-block {
  margin-bottom: 25px;
  text-align: left; /* 内容左对齐更好看 */
  padding: 0 10px;
}

h3 {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 狐狸/猫咪 比例条 */
.fox-cat-bar {
  display: flex;
  height: 24px;
  border-radius: 12px;
  overflow: hidden;
  font-size: 0.85rem;
  color: white;
  font-weight: bold;
  line-height: 24px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.bar-fox {
  width: 30%;
  background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%);
  text-align: center;
}

.bar-cat {
  width: 70%;
  background: linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%);
  text-align: center;
}

/* 标签组 */
.tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.custom-tag {
  border: none !important;
  font-size: 0.95rem;
  padding: 8px 15px;
  height: auto;
  color: #555;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.3s;
}

.custom-tag:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(255, 182, 193, 0.4);
}

/* 技术栈 */
.tech-text {
  line-height: 1.6;
  color: #666;
}

.tech-highlight {
  color: #42b883; /* Vue Green */
  font-weight: bold;
  background: rgba(66, 184, 131, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
}

/* 底部寄语 */
.message-box {
  margin-top: 30px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 12px;
  color: #ea8102;
  font-style: italic;
  font-size: 0.95rem;
  border: 1px dashed #ffb6c1;
}

/* 动画定义 */
@keyframes popIn {
  0% { opacity: 0; transform: scale(0.9) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes floatBadge {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes wave {
  0% { transform: rotate(0deg); }
  10% { transform: rotate(14deg); }
  20% { transform: rotate(-8deg); }
  30% { transform: rotate(14deg); }
  40% { transform: rotate(-4deg); }
  50% { transform: rotate(10deg); }
  60% { transform: rotate(0deg); }
  100% { transform: rotate(0deg); }
}

/* 移动端适配 */
@media (max-width: 600px) {
  .glass-card {
    padding: 25px 15px;
  }
  .title {
    font-size: 1.6rem;
  }
  .fox-cat-bar {
    font-size: 0.75rem;
  }
}
</style>