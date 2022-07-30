import axios from './axios'
interface IdataType {
    data: any
}
axios
    .request<IdataType>({
        method: 'GET',
        url: 'http://httpbin.org/get',
        params: { name: '李雨锋' },
        loading: true
    })
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {})
