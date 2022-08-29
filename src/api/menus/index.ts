import axios from '../axios'
import type { IDataType } from '../types'
enum URLApi {
    MenuListApi = '/api/menus/list'
}

/**
 * 获取所有菜单树
 * @param {*} body
 * @returns {*}
 */
export const getMenuList = () => {
    return axios.request<IDataType /* return type */>({
        method: 'GET',
        url: URLApi.MenuListApi,
        loading: true
    })
}
