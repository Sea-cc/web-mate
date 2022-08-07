<template>
    <div class="auth">
        <auth-register
            v-if="authSwitch !== 'LOGIN'"
            @switchForm="switchForm"
            :authSwitch="authSwitch"
        />
        <auth-login v-else @switchForm="switchForm" :authSwitch="authSwitch" />
        <Transition name="fade">
            <div class="auth-bg-left" v-if="authSwitch === 'LOGIN'">
                <img src="@/assets/images/login.svg" alt="" />
            </div>
            <div class="auth-bg-right" v-else>
                <img src="@/assets/images/register.svg" alt="" />
            </div>
        </Transition>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import AuthLogin from './AuthLogin.vue'
import AuthRegister from './AuthRegister.vue'
export default defineComponent({
    components: { AuthLogin, AuthRegister },
    name: 'LoGin',
    setup() {
        let authSwitch = ref('LOGIN')
        const switchForm = (formType: string) => {
            authSwitch.value = formType
        }
        return {
            switchForm,
            authSwitch
        }
    }
})
</script>
<style lang="scss" scoped>
.auth {
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .auth-bg-left,
    .auth-bg-right {
        position: absolute;
        overflow: hidden;
        width: 50%;
        height: 100%;
        background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 80%;
        }
    }
    .auth-bg-left {
        box-shadow: -35px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
        border-top-right-radius: 55px;
        border-bottom-right-radius: 55px;
        left: 0;
    }
    .auth-bg-right {
        box-shadow: 0px 12px 32px 4px rgba(0, 0, 0, 0.04), 0px 8px 20px rgba(0, 0, 0, 0.08);
        border-top-left-radius: 55px;
        border-bottom-left-radius: 55px;
        right: 0;
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: all 0.8s ease;
}
.anmimate-box {
    overflow: hidden;
}
.fade-enter-from.auth-bg-left {
    transform: translateX(-100%);
}
.fade-leave-to.auth-bg-left {
    transform: translateX(-100%);
}
.fade-enter-from.auth-bg-right {
    transform: translateX(100%);
}
.fade-leave-to.auth-bg-right {
    transform: translateX(100%);
}
</style>
