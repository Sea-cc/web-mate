/**
 * axios封装,使axiso更加可配置化、扩展性更加强大、更加灵活
 * @param {全局}
 * @param {实例化HttpAxios中配置}
 * @param {单独请求方式中配置} 该方式可灵活处理后端返回的不同数据类型
 */

import axios from 'axios'
import type {
    AxiosInstance /* axios实例类型 */,
    AxiosRequestConfig /* axios配置类型 */,
    AxiosResponse /* 响应成功类型 */
} from 'axios'

/* 定义拦截器接口 */
interface IInterceptors {
    /* 定义拦截请求如：axios.interceptors.request.use(config=>config,err=>err) */
    reqInterceptorRes: (config: AxiosRequestConfig) => AxiosRequestConfig
    reqInterceptorErr: (err: any) => any
    /* 定义响应拦截如：axios.interceptors.response.use(res=>res,err=>err) */
    resInterceptorRes: (res: any) => any /* AxiosResponse替换为any,待修正 */
    resInterceptorErr: (err: any) => any
}

/* 扩展 AxiosRequestConfig,为了能传入拦截器(默认AxiosRequestConfig没有interceptor),供类使用【增强扩展】 */
interface IAxiosRequestConfig_ extends AxiosRequestConfig {
    interceptor?: IInterceptors
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
                const TOKEN = ''
                if (!TOKEN) {
                    const { headers } = config
                    config.headers = { ...headers, Authorization: 'baseURL' }
                }
                console.log(config, '全局请求拦截')

                return config
            },
            (err) => {
                return err
            }
        )
        this.instance.interceptors.response.use(
            (res) => {
                // ...
                return res.data /* 这里修改返回数据,注意单独请求配置中的类型兼容 */
            },
            (err) => {
                return err
            }
        )
        /* 以上拦截器执行顺序：请求全局 -> 请求动态自定义 -> 响应动态自定义 -> 响应全局【反之可根据代码顺序更改】📦 */
    }
    /* prettier-ignore */
    /* axios.request(config)【request<T>(config: IAxiosRequestConfig_): Promise<T>📦】 */
    request<T>(config: IAxiosRequestConfig_ /* AxiosRequestConfig更换IAxiosRequestConfig_【实现自定义单个请求方式的拦截器】 */): Promise<T> {
        /* 返回的类型由调用者决定 <T> */
        return new Promise((resolve, reject) => {
            if (config.interceptor) {
                config = config.interceptor.reqInterceptorRes(config)
            } /* 单独方法中是否存在拦截器 */
            this.instance
                .request<any,T>(config)
                /* request<any,T>,纠正 result 数据类型 */
                .then((result) => {/* 【result: AxiosResponse<any, any>】推导错误,当前数据在全局响应拦截已经被修改了res.data */
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
    get<T>(url: string, config?: IAxiosRequestConfig_): Promise<T> {
        config = { ...config, url, method: 'GET' }
        return this.request<T>(config)
    }
    post<T>(url: string, data: object, config?: IAxiosRequestConfig_): Promise<T> {
        config = { ...config, url, method: 'POST', data }
        return this.request<T>(config)
    }
}

export default new HttpAxios({})
