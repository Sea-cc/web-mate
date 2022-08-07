import { createStore } from 'vuex'
import { IUser } from './auth/types'
import loginModule from './auth/auth_'
export default createStore<IUser>({
    state: () => {
        return {
            name: 'Emojis',
            age: 1
        }
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: { loginModule }
})
