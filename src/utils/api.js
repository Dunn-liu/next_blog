import axios from "axios";
let baseURL = 'https://api.codespring.top'
axios.interceptors.request.use(config => {
    config.timeout = 1000,
        config.baseURL = baseURL,
        config.headers
    return config
}, error => {
    console.log(error)
})
axios.interceptors.response.use(response => {
    return response
}, error => {
    console.log(error)
})
export function apiGet(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params }).then(res =>
            resolve(res?.data)
        ).catch(e => reject(e))
    })
}
export function apiPost(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(res =>
            resolve(res?.data)
        ).catch(e => reject(e))
    })
}
