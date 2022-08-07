export interface ILogin {
    email: string
    password: string
}

// 返回的数据类型
export interface IDataType<T = any> {
    code: number
    data: T
    message: string
    state: number
    [prop: string]: any
}
export interface Itree {
    _id: string
    name: string
    url: string
    icon: string
    weight: number
    parentId?: string
    createTime: string
    updateTime?: string
    children?: Itree[]
    // [prop: string]: any
}
