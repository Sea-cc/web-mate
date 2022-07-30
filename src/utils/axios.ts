import axios from 'axios' /* 导入实例对象axios(为一个对象) */
/* 全局配置🦫 */
axios.defaults.timeout = 5 * 1000 /* 请求超时 */
axios.defaults.baseURL = 'http://httpbin.org' /* 请求根路径 */
axios.defaults.responseType = 'json' /* 响应数据格式 */

/* get(url,config) */
axios
    .get('/get', {
        params: {},
        /* 局部配置🦈 */
        timeout: 5 * 1000,
        headers: {}
    })
    .then((result /* AxiosResponse */) => {
        console.log(result) /* 服务器返回的数据存在于 result.data 中 */
    })

/* post(url,data[,config]) */
axios
    .post('/post', {
        data: {
            name: 'wx'
        }
    })
    .then((result /* AxiosResponse */) => {
        console.log(result)
    })

axios.interceptors.request.use(
    function (config) {
        return config
    } /* 请求之前触发 */,
    function (error) {
        return Promise.reject(error)
    } /* 请求错误触发 */
)
console.log(process.env.VUE_APP_BASE_URL, 'VUE_APP_BASE_URL')

axios.interceptors.response.use(
    function (response) {
        return response
    } /* 2xx 范围内的状态码触发 */,
    function (error) {
        return Promise.reject(error)
    } /* 超出 2xx 范围的状态码触发 */
)
export default axios
