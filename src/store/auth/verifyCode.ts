import { defineStore } from 'pinia'
interface IverifCode {
    countDown: number
    timer: NodeJS.Timeout | null
    disabled_: boolean
}
/* interface UserState {
    userInfo: Nullable<IUserInfoProps>
} */
export const verifyCodeStore = defineStore('verifyCode', {
    state: (): IverifCode => {
        return {
            countDown: 60,
            timer: null,
            disabled_: false
        }
    },
    getters: {},
    actions: {
        handleverifyCode() {
            this.disabled_ = true
            this.timer = setInterval(() => {
                if (this.countDown === 1) {
                    this.disabled_ = false
                    this.countDown = 60
                    clearInterval(Number(this.timer))
                }
                this.countDown -= 1
            }, 1000)
        }
    }
})
