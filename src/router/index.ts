import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
/* or import type { RouteRecordRaw } from 'vue-router' 表示导入为一个类型 */
import HomeView from '../pages/HomeView.vue'

const routes: Array<RouteRecordRaw> /* 类型注解 */ = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('../pages/AboutView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
