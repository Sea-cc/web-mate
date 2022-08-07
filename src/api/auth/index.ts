import axios from '../axios'
import { ILogin, IDataType, Itree } from './types'
enum AuthApi {
    LoginApi = '/api/users/login',
    MenusApi = '/api/menus/list'
}

/**
 * 登录
 * @param {*} body
 * @returns {*}
 */
export const signIn = (body: ILogin) => {
    return axios.request<IDataType<string>>({
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
        method: 'GET',
        url: AuthApi.MenusApi
    })
}
