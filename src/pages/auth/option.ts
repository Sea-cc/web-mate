const validateEmail = (rule: any, value: any, callback: any) => {
    if (value === '') return callback(new Error('请输入邮箱账号！'))
    callback()
}
const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') return callback(new Error('请输入密码！'))
    callback()
}

// 登录配置
export const loginrules = {
    email: [
        { validator: validateEmail, trigger: 'blur' },
        {
            pattern:
                /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/i,
            message: '请输入正确的邮箱格式！'
        }
    ],
    password: [
        { validator: validatePass, trigger: 'blur' },
        {
            pattern: /^(\w){6,20}$/,
            message: '密码格式为6-20个字母、数字、下划线组成！'
        }
    ]
}
