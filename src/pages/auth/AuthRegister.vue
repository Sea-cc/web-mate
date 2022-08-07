<template>
    <div class="login">
        <div class="login-title">
            <h3>START FOR FREE</h3>
            <h1>创建新账户</h1>
            <p>赶紧创建一个新账户吧~</p>
        </div>
        <div class="form">
            <el-form
                ref="ruleFormRef"
                :model="ruleForm"
                size="large"
                :rules="rules"
                class="demo-ruleForm"
            >
                <el-form-item label="" prop="name">
                    <div class="user-code">
                        <el-col :span="12">
                            <el-input v-model="ruleForm.name" placeholder="请输入用户名" />
                        </el-col>
                        <el-col style="padding: 0 30px; font-weight: 600" :span="8">
                            <el-radio-group v-model="ruleForm.gender">
                                <el-radio label="1"> ♂ </el-radio>
                                <el-radio label="0"> ♀ </el-radio>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="4">
                            <img :src="genderSvg" alt="" srcset="" />
                        </el-col>
                    </div>
                </el-form-item>
                <el-form-item label="" prop="email">
                    <el-input
                        v-model="ruleForm.email"
                        placeholder="请输入邮箱账号"
                        autocomplete="off"
                    />
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input
                        v-model="ruleForm.password"
                        type="password"
                        placeholder="请输入密码"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="" prop="password_">
                    <el-input
                        v-model="ruleForm.password_"
                        type="password"
                        placeholder="请再次确认密码"
                        show-password
                    />
                </el-form-item>
                <el-form-item label="" prop="code">
                    <div class="user-code">
                        <el-col :span="15">
                            <el-input v-model="ruleForm.code" placeholder="请输入验证码" />
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" @click="getCode" :disabled="disabled.value">{{
                                disabled.value ? count : '获取验证码'
                            }}</el-button>
                        </el-col>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)">注 册</el-button>
                    <el-button @click="handeRegister('LOGIN')">返 回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch, defineEmits, getCurrentInstance, computed } from 'vue'
import { verifyCodeStore } from '@/store/auth/verifyCode'
import { storeToRefs } from 'pinia'
import boy from '@/assets/images/boy-svgrepo-com.svg'
import girl from '@/assets/images/girl-svgrepo-com.svg'
import type { FormInstance } from 'element-plus'
const emits = defineEmits(['switchForm'])
const handeRegister = (formType: string) => {
    emits('switchForm', formType)
}

// 获取ruleFormRef dom
const ruleFormRef = ref<FormInstance>()
const validate = (rule: any, value: any, callback: any) => {
    if (value === '') return callback(new Error('必填项！'))
    callback()
}
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('必填项！'))
    } else if (value !== ruleForm.password) {
        callback(new Error('两次密码输入不相同!'))
    } else {
        callback()
    }
}
const ruleForm = reactive({
    name: '',
    email: '',
    password: '',
    code: '',
    gender: '1'
})
// 性别svg
let genderSvg = ref(boy)
watch(
    () => ruleForm.gender,
    (value) => {
        genderSvg.value = value === '0' ? ref(girl).value : ref(boy).value
    }
)

const rules = reactive({
    name: [
        { validator: validate, trigger: 'blur' },
        { min: 6, message: '长度不小于 6 个字符', trigger: 'blur' },
        { max: 12, message: '长度不大于 12 个字符', trigger: ['blur', 'change'] }
    ],
    email: [
        { validator: validate, trigger: 'blur' },
        {
            pattern:
                /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i,
            message: '请输入正确的邮箱格式！'
        }
    ],
    password: [
        { validator: validate, trigger: 'blur' },
        {
            pattern: /^(\w){6,20}$/,
            message: '密码格式为6-20个字母、数字、下划线组成！'
        }
    ],
    password_: [{ validator: validatePass, trigger: 'blur' }],
    code: [{ validator: validate, trigger: 'blur' }]
})

const { proxy }: any = getCurrentInstance()
const store = verifyCodeStore()
const { countDown, timer, disabled_ } = storeToRefs(store)
const count = computed(() => countDown)
const timer_ = computed(() => timer)
const disabled = computed(() => disabled_)
console.log(disabled)

const getCode = () => {
    if (!timer_.value) return
    proxy.$message.success('验证码已发送')
    store.handleverifyCode()
}

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (!valid) return
        // ...
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
    margin-right: 50vw;

    flex: 1;
    padding: 0 8%;
    justify-items: center;
    align-self: center;
    h1 {
        color: #353c66;
    }
    p,
    h3 {
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
        & .el-button--large {
            width: 46%;
            border-radius: 20px;
            border: 2px #f9f8f8 solid;
            &:hover {
                transition: all 0.5s;
                box-shadow: var(--el-box-shadow-lighter);
            }
        }
        .user-code {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            button {
                border-radius: 12px;
                width: 100%;
            }
        }
    }
}
</style>
