import { Buffer } from 'buffer';
window.Buffer = Buffer; // 重新手动挂载到全局 window 对象


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './api/progress.css'

import VueLazyload from 'vue3-lazyload'

NProgress.configure({
  showSpinner: false,
  speed: 700,
  trickleSpeed: 200,
})

function handleScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0
  NProgress.set(progress)
}

window.addEventListener('scroll', handleScroll)

//element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(VueLazyload, {
  loading: '/loding_juju.gif',
  error: '/error_su.png'
})

app.mount('#app')
