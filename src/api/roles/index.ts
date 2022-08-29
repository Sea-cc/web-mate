import axios from '../axios'
import type { IDataType } from '../types'
enum URLApi {
    RoleListApi = '/api/roles/list',
    RoleDelApi = '/api/roles/delete'
}

/**
 * 获取角色列表
 * @returns {*}
 */
export const getRolesList = () => {
    return axios.request<IDataType>({
        method: 'GET',
        url: URLApi.RoleListApi,
        loading: true
    })
}

/**
 * 删除角色
 * @param {*} id
 * @returns {*}
 */
export const deleteRole = (id: number) => {
    return axios.request<IDataType>({
        method: 'POST',
        url: URLApi.RoleDelApi,
        data: { id },
        loading: true
    })
}
