import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
/* or import type { RouteRecordRaw } from 'vue-router' 表示导入为一个类型 */
import LocalCache from '@/utils/cache'
import { authStore } from '@/store/auth/auth'

const routes: Array<RouteRecordRaw> /* 类型注解 */ = [
    {
        path: '/',
        redirect: '/main'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/auth/index.vue')
    },
    {
        path: '/main',
        name: 'main',
        redirect: '/main/index',
        component: () => import('../pages/main/index.vue'),
        /* 根据用户菜单与总路由对比生成的动态路由 */
        children: []
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'fourOfFour',
        component: () => import('@/components/404.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from) => {
    if (to.path !== '/login') {
        const auth = authStore()
        const token = auth.TOKEN /* || LocalCache.getCache('AdminAuthToken') */
        if (!token) return '/login'
    }
    // 根据路由修改页面标题
    document.title = (to.meta.name as string) || '管理后台'
})

export default router
