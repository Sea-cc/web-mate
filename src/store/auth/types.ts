export interface IUser {
    name: string
    age: number
}
export interface ILogin {
    name: string
    age: number
}

// 登录前置数据
export interface IAuthData {
    TOKEN: string
    userInfo: any
    userMenus: any
}
