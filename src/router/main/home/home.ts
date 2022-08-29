export default {
    path: '/main/index',
    name: 'home',
    meta: {
        title: '首页'
    },
    component: () => import('@/pages/main/home/index.vue')
}
