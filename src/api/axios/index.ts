/**
 * axios封装,使axiso更加可配置化、扩展性更加强大、更加灵活
 * @param {全局}
 * @param {实例化HttpAxios中配置}
 * @param {单独请求方式中配置} 该方式可灵活处理后端返回的不同数据类型
 */
import axios from 'axios'
import { errorStatusCode } from './option'
import LocalCache from '@/utils/cache'
import { authStore } from '@/store/auth/auth'
import { ElNotification } from 'element-plus'
import { ElMessage } from 'element-plus'

// import { ElMessage } from 'element-plus'
import type {
    AxiosInstance /* axios实例类型 */,
    AxiosRequestConfig /* axios配置类型 */,
    AxiosResponse /* 响应成功类型 */
} from 'axios'

/* 定义拦截器接口 */
interface IInterceptors<T = AxiosResponse> {
    /* 定义拦截请求如：axios.interceptors.request.use(config=>config,err=>err) */
    reqInterceptorRes: (config: AxiosRequestConfig) => AxiosRequestConfig
    reqInterceptorErr: (err: any) => any
    /* 定义响应拦截如：axios.interceptors.response.use(res=>res,err=>err) */
    resInterceptorRes: (
        res: T
    ) => T /*T来自 HttpAxios.request泛型->IAxiosRequestConfig_<T> .interceptor*/
    resInterceptorErr: (err: any) => any
}

/* 扩展 AxiosRequestConfig,为了能传入拦截器(默认AxiosRequestConfig没有interceptor),供类使用【增强扩展】 */
interface IAxiosRequestConfig_<T = AxiosResponse> extends AxiosRequestConfig {
    interceptor?: IInterceptors<T>
    loading?: boolean /* 加载动画,默认false🦫 */
} /* 继承AxiosRequestConfig,并拥有interceptor,而拦截器是一个可选的 */

class HttpAxios {
    instance: AxiosInstance /* axios 实例 */
    interceptors?: IInterceptors /* 拦截器对象 */
    // loading = false
    constructor(config: IAxiosRequestConfig_ /* IAxiosRequestConfig_替换AxiosRequestConfig */) {
        this.instance = axios.create(config)
        config.loading ??= false /* 默认值 */

        this.interceptors = config.interceptor /* 初始化保存拦截器 */
        /* 构建请求拦截器于axios实例中【动态可配置的,根据实例化config决定】 */
        this.instance.interceptors.request.use(
            this.interceptors?.reqInterceptorRes,
            this.interceptors?.reqInterceptorErr
        )
        this.instance.interceptors.response.use(
            this.interceptors?.resInterceptorRes,
            this.interceptors?.resInterceptorErr
        )

        /* 全局的拦截器 */
        this.instance.interceptors.request.use(
            (config) => {
                // ...
                const TOKEN = authStore().TOKEN || LocalCache.getCache('AdminAuthToken')
                const { headers } = config
                config.headers = { ...headers, Authorization: 'baseURL' }
                console.log(config, '全局请求拦截')

                return config
            },
            (err) => {
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                // 处理错误提示,此提示为用户操作错误,与系统错误无关(ElMessage)
                if (res.data.code >= 400 || res.data.state === 0) {
                    const message = res.data.message ?? '请求失败'
                    ElMessage.error(message)
                    return Promise.reject(res.data)
                }
                // ...
                // 请求回来的是文件流或者文本的情况
                // 登录过期｜token无效情况跳转
                return res.data /* 这里修改返回数据,注意单独请求配置中的类型兼容 */
            },
            (err) => {
                const message = errorStatusCode[err.response.status] ?? '请求错误'
                ElNotification({
                    title: 'Error',
                    message,
                    type: 'error'
                })
                return Promise.reject(err.response)
            }
        )
        /* 以上拦截器执行顺序：请求全局 -> 请求动态自定义 -> 响应动态自定义 -> 响应全局【反之可根据代码顺序更改】📦 */
    }
    /* prettier-ignore */
    /* axios.request(config)【request<T>(config: IAxiosRequestConfig_): Promise<T>📦】 */
    request<T>(config: IAxiosRequestConfig_ <T>/* AxiosRequestConfig更换IAxiosRequestConfig_【实现自定义单个请求方式的拦截器】 */): Promise<T> {
        /* 返回的类型由调用者决定 <T> */
        return new Promise((resolve, reject) => {
            if (config.interceptor) {
                config = config.interceptor.reqInterceptorRes(config)
            } /* 单独方法中是否存在拦截器 */
            this.instance
                .request<any,T>(config)
                /* request<any,T>,纠正 result 数据类型 */
                .then((result) => {/* 【result: AxiosResponse<any, any>】推导错误,当前数据在全局响应拦截已经被修改了res.data,已通过IAxiosRequestConfig_ <T>纠正 */
                    if (config.interceptor) {
                        result = config.interceptor.resInterceptorRes(result)
                    } /* 同上 */
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }
    get<T>(url: string, config?: IAxiosRequestConfig_<T>): Promise<T> {
        config = { ...config, url, method: 'GET' }
        return this.request<T>(config)
    }
    post<T>(url: string, data: object, config?: IAxiosRequestConfig_<T>): Promise<T> {
        config = { ...config, url, method: 'POST', data }
        return this.request<T>(config)
    }
}

export default new HttpAxios({})
