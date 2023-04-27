// 1.对于数据请求的封装
// import axios from 'axios'
// function httpForList () {
//   return axios({
//     url: 'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=5535703',
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16807719932665538308276225"}',
//       'X-Host': 'mall.film-ticket.film.list',
//       'X-Requested-With': 'XMLHttpRequest'
//     }
//   })
// }
// function httpForDetail (params) {
//   return axios({
//     url: `https://m.maizuo.com/gateway?filmId=${params}&k=3243724`,
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16807719932665538308276225"}',
//       'X-Host': 'mall.film-ticket.film.info',
//       'X-Requested-With': 'XMLHttpRequest'
//     }
//   })
// }

// export default {
//   httpForList,
//   httpForDetail
// }

// 2.对于数据请求的封装 axios 自带的封装
import axios from 'axios'
import { Toast } from 'vant'
const http = axios.create({
  baseURL: 'https://m.maizuo.com',
  timeout: 10000,
  headers: {
    'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16807719932665538308276225"}',
    'X-Requested-With': 'XMLHttpRequest'
  }
})

// 在成功之前拦截显示加载框
http.interceptors.request.use(function (config) {
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    duration: 0
  })
  return {
    ...config,
    xxx: 'thresh'
  }
}, function (error) {
  Toast.clear()
  return Promise.reject(error)
})

// 在成功后拦截
http.interceptors.response.use(function (config) {
  Toast.clear()
  return {
    ...config,
    xxx: 'thresh'
  }
}, function (error) {
  Toast.clear()
  return Promise.reject(error)
})
export default http
