import axios from 'axios'
import {
  erp_url,
  payload,
  headers
} from './config.js'
import { LocalStorage } from 'node-localstorage'

const api = axios.create({
  baseURL: erp_url,
  headers
})

const localStorage = new LocalStorage('./scratch')

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('access_token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const tokenResponse = await axios.post(
          auth_url,
          payload,
          { headers }
        )

        const { access_token } = tokenResponse.data

        localStorage.setItem('access_token', access_token)

        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Refresh token expired. Logging out...', refreshError)
        localStorage.clear()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api