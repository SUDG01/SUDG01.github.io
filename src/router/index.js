import { createRouter, createWebHashHistory } from "vue-router";
//路由文件


//定义一个路由
const routes = [
    {path: '/', name: 'Home', component: () => import('../views/Home.vue')},
    {path: '/about', name: 'About', component: () => import('../views/About.vue')},
    {path: '/posts', name: 'Posts', component: () => import('../views/PostsView.vue')},
    {path: '/post/:id', name: 'PostDetail', component: () => import('../views/PostDetail.vue')},
    {path: '/timeline', name: 'Timeline', component: () => import('../views/TimeLine.vue')},
]

//创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;