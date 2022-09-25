// 基于axios封装网络请求的函数
import router from '@/router'
import store from '@/store'
import axios from 'axios'

export const baseURL = 'http://big-event-vue-api-t.itheima.net'
const myAxios = axios.create({
  baseURL
})

// 定义请求拦截
myAxios.interceptors.request.use(function (config) {
  config.headers.Authorization = store.state.token
  return config
}, function (error) {
  // 请求发起前代码，如果有异常报错，会直接进入这里
  return Promise.reject(error)
})

// 定义请求拦截
myAxios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    store.commit('updateToken', '')
    store.commit('updateUserInfo', {})
    router.push('login')
  }
  // 请求发起前代码，如果有异常报错，会直接进入这里
  return Promise.reject(error)
})

export default myAxios
