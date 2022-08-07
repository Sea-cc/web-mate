import { Module } from 'vuex'
import { IUser, ILogin } from './types'
const loginModule: Module<IUser, ILogin> /* 泛型类型“Module<S, R>”需要 2 个类型参数 */ = {
    namespaced: true /* 最好给模块定义一个命名空间 */,
    actions: {
        actionFn: ({ commit }, payload: any) => {
            // ...
            console.log(payload)
            console.log('stroe,login')
        }
    }
}
export default loginModule
