import axios from '../axios'
import type { ILogin, IDataType, Itree } from './types'
enum AuthApi {
    LoginApi = '/api/users/login',
    MenusApi = '/api/permissions'
}

/**
 * 登录
 * @param {*} body
 * @returns {*}
 */
export const signIn = (body: ILogin) => {
    return axios.request<IDataType<any>>({
        method: 'POST',
        url: AuthApi.LoginApi,
        data: body,
        loading: true
    })
}

/**
 * 获取菜单树
 * @param {*} body
 * @returns {*}
 */
export const getMenutree = () => {
    return axios.request<IDataType<Itree>>({
        method: 'POST',
        url: AuthApi.MenusApi
    })
}
