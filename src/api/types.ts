// 返回的数据类型
export interface IDataType<T = any> {
    code: number
    data: T
    message: string
    state: number
    [prop: string]: any
}
