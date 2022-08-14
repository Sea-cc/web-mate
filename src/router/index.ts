import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
/* or import type { RouteRecordRaw } from 'vue-router' 表示导入为一个类型 */
import LocalCache from '@/utils/cache'
import { authStore } from '@/store/auth/auth'

const routes: Array<RouteRecordRaw> /* 类型注解 */ = [
    {
        path: '/',
        name: 'home',
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
        component: () => import('../pages/main/index.vue'),
        children: [
            {
                path: '/main/index',
                name: 'home',
                component: () => import('@/pages/main/home/index.vue')
            },
            {
                path: '/main/systemManagement',
                name: 'system',
                // component: () => import('@/components/404.vue')
                children: [
                    {
                        path: '/main/systemManagement/userManagement',
                        name: 'system',
                        component: () => import('@/pages/main/system/user/index.vue')
                    }
                ]
            },
            // {
            //     path: '/main/componentManagement',
            //     name: 'componentManagement',
            //     redirect: '/main/componentManagement/table',
            //     // component: () => import('@/components/404.vue')
            //     children: [
            //         {
            //             path: '/main/componentManagement/table',
            //             name: 'system',
            //             component: () => import('@/pages/main/componentManagement/table/index.vue')
            //         }
            //     ]
            // },
            {
                path: '/:catchAll(.*)',
                name: 'fourOfFour',
                component: () => import('@/components/404.vue')
            }
        ]
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
})

export default router
