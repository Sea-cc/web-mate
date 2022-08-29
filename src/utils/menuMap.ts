/**
 * 菜单 - 路由 映射逻辑
 * @param {1} 加载所有默认的路由'router'下定义好的<RouteRecordRaw>对象
 * @param {2} 根据接口菜单映射对比出真正需要注册的路由
 * @returns {RouteRecordRaw[]}
 */
import type { RouteRecordRaw } from 'vue-router'
export default function (menus: any[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []
    const allRoutes: RouteRecordRaw[] = []
    const routeFiles = require.context('../router/main', true, /\.ts/)
    routeFiles.keys().forEach((key) => {
        const route = require('../router/main' + key.split('.')[1])
        allRoutes.push(route.default)
    })
    const recurseGetRouteMenus = (menus: any[]) => {
        for (const item of menus) {
            // 存在children,children的数据就是需要映射的(拥有children属性的对象不需要映射)
            if (item.children) {
                // 递归继续获取路由对象数据
                recurseGetRouteMenus(item.children)
            } else {
                // 不存在children,表示一级菜单路由,也需要映射
                const route = allRoutes.find(({ path }) => path === item.url)
                const { description, hide, state, name } = item
                route && route.meta && Object.assign(route.meta, { description, hide, state, name })
                route && routes.push(route)
            }
        }
    }
    recurseGetRouteMenus(menus)
    return routes.concat({
        path: '/:catchAll(.*)' /* '/:pathMatch(.*)*' */,
        name: 'fourOfFour',
        component: () => import('@/components/404.vue')
    })
}
