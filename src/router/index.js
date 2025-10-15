import { createRouter, createWebHistory } from "vue-router";
//路由文件
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import PostDetail from "../views/PostDetail.vue";

//定义一个路由
const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/about', name: 'About', component: About},

    {path: '/post/:id', name: 'PostDetail', component: PostDetail},
]

//创建路由
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;