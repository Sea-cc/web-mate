<template>
    <div class="login">
        <div class="login-title">
            <h1>你好呀 ！👋</h1>
            <h1>欢迎回来~</h1>
            <p>赶紧登录吧</p>
            <p>我们等你好久了</p>
            <br />
        </div>
        <div class="form">
            <el-form
                ref="formRef"
                :model="formModel"
                size="large"
                :rules="loginrules"
                class="demo-formModel"
            >
                <el-form-item label="" prop="email">
                    <el-input
                        v-model="formModel.email"
                        placeholder="请输入邮箱账号"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input
                        v-model="formModel.password"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">登 录</el-button>
                    <el-button @click="handeRegister('REGISTER')">注 册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, defineProps, defineEmits, getCurrentInstance, onMounted } from 'vue'
import type { FormInstance } from 'element-plus'
import { loginrules } from './option'
import LocalCache from '@/utils/cache'
// import { useStore } from 'vuex'
import { authStore } from '@/store/auth/auth'

const emits = defineEmits(['switchForm'])
const handeRegister = (formType: string) => {
    emits('switchForm', formType)
}

// 表单 dom
const formRef = ref<FormInstance>()

const formModel = reactive({
    email: LocalCache.getCache('email') ?? '' /* 进行is记住密码 */,
    password: LocalCache.getCache('password') ?? ''
})

// const store = useStore()
const auth = authStore()
// const loginRef = ref(null)
const submitForm = () => {
    if (!formRef.value) return
    formRef.value.validate((valid) => {
        if (!valid) return
        console.log(formModel, 'formModel')
        auth.handlelogin(formModel)
        // ...is记住密码(本地缓存,可进行信息加密和反解密)
        LocalCache.setCache('email', formModel.email)
        LocalCache.setCache('password', formModel.password)
        // store.dispatch('loginModule/actionFn', {
        //     ...formModel
        // }) /* key:模块名/模块的action方法，value:数据 */
    })
}

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
}
</script>
<style lang="scss" scoped>
.login {
    --el-border-color: transparent;
    margin-left: 50vw;
    flex: 1;
    padding: 0 8%;
    justify-items: center;
    align-self: center;
    h1 {
        color: #353c66;
    }
    p {
        color: #a2a2a4;
    }
    ::v-deep .el-input--large .el-input__wrapper {
        border-radius: 12px;
        background-color: #f2f6fc;
    }
    ::v-deep .el-form-item__content {
        border-color: transparent;
    }
    ::v-deep .el-form-item--large .el-form-item__content {
        display: flex;
        justify-content: space-around;
        border: none;
        .el-button--large {
            width: 46%;
            border-radius: 20px;
            border: 2px #f9f8f8 solid;
            &:hover {
                transition: all 0.5s;
                box-shadow: var(--el-box-shadow-lighter);
            }
        }
    }
}
</style>
