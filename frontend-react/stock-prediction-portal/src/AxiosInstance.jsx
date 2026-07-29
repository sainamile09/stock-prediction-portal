import axios from 'axios'
import Cookies from 'js-cookie'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = Cookies.get('access_token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refresh_token = Cookies.get('refresh_token')
      try {
        const res = await axiosInstance.post('/token/refresh/', {
          refresh: refresh_token
        })
        if (res.status === 200 || res.status === 201) {
          Cookies.set('access_token', res.data.access)
          return axiosInstance(originalRequest)
        }
      } catch (err) {
        console.error('Refresh token is invalid or expired', err)
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
