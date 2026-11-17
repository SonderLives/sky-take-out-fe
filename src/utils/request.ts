import axios from 'axios'
import { ElMessage } from 'element-plus'
// 按需引入 ElMessage 的样式：全量 CSS 已移除，而服务式组件（ElMessage 等）不经过模板扫描，
// 不会被 unplugin-vue-components 自动处理，必须手动引入对应样式
import 'element-plus/es/components/message/style/css'

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 30000,
})

// 请求拦截器：自动携带 token
request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.token = token
  }
  return config
})

// 响应拦截器
// 注意：后端在 HTTP 层恒返回 200，真正的结果在 body.code 中，1 表示成功
request.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data

    if (code === 1) {
      return response.data
    }

    if (code === 10002) {
      // 未授权：清除失效 token，避免后续请求持续失败
      localStorage.removeItem('token')
      ElMessage({ type: 'error', message: '未授权，请重新登录' })
    } else {
      ElMessage({ type: 'error', message: msg || `请求失败（code=${code}）` })
    }

    return Promise.reject(new Error(msg || `业务异常 code=${code}`))
  },
  (error) => {
    // 网络层失败：error.response 可能不存在（后端未启动、超时、断网）
    let message = ''
    if (!error.response) {
      message = error.code === 'ECONNABORTED' ? '请求超时' : '网络异常，请确认后端服务已启动'
    } else {
      switch (error.response.status) {
        case 401:
          message = '登录过期'
          break
        case 403:
          message = '无权访问'
          break
        case 404:
          message = '接口不存在'
          break
        case 500:
          message = '服务器内部错误'
          break
        default:
          message = `请求失败（${error.response.status}）`
      }
    }

    ElMessage({ type: 'error', message })

    return Promise.reject(error)
  },
)

export default request
