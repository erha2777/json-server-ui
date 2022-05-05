import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
  // baseURL: 'http://localhost:3006'
  baseURL: '/api'
})
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.status === 200 || response.status === 200) {
    // 响应成功的时候

    return Promise.resolve(response.data)
  } else {
    // 响应失败的时候

    return Promise.reject(response)
  }
}, function (error) {
  // 对响应错误做点什么
  ElMessage.error('请求失败')
  return Promise.reject(error)
})

export default request
