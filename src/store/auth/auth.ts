import { defineStore } from 'pinia'
import { IAuthData } from './types'
import { signIn, getMenutree } from '@/api'
import { ILogin } from '@/api/auth/types'
import { ElMessage } from 'element-plus'
import router from '@/router'
// 解析token
import jwt_decode from 'jwt-decode'
import LocalCache from '@/utils/cache'
/* interface UserState {
    userInfo: Nullable<IUserInfoProps>
} */
export const authStore = defineStore('auth', {
    state: (): IAuthData => {
        return {
            // 最好不要直接修改state数据😅
            TOKEN: LocalCache.getCache('AdminAuthToken'),
            userInfo: LocalCache.getCache('UserInfo'),
            userMenus: LocalCache.getCache('AdminAuthMenus')
        }
    },
    getters: {},
    actions: {
        async handlelogin(body: ILogin) {
            // 这里请求方法进行了类型校验,当接口数据类型返回错误时,获取不到(已解决),需要try catch捕获
            const result = await signIn(body)
            // 保存token于auth 状态管理中与本地存储
            this.TOKEN = result.data
            // 解析token于auth 状态管理中与本地存储
            this.userInfo = jwt_decode(result.data)
            LocalCache.setCache('AdminAuthToken', result.data)
            LocalCache.setCache('UserInfo', this.userInfo)
            // 获取系统菜单权限等
            this.handleMenus()
            ElMessage.success(`你好呀！👋，欢迎回来`)
        },
        async handleMenus() {
            const result = await getMenutree()
            this.userMenus = result.data
            LocalCache.setCache('AdminAuthMenus', result.data)
            router.push('/main')
        }
    }
})
export const steupAuthStore = () => {
    // 修改为直接state初始化时去获取
    // authStore().TOKEN = LocalCache.getCache('AdminAuthToken')
    // authStore().userMenus = LocalCache.getCache('AdminAuthMenus')
    // authStore().userInfo = LocalCache.getCache('UserInfo')
}
