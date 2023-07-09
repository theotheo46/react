import axios, { AxiosInstance } from 'axios'

export const baseApi = (api: 'ya' | 'local' = 'ya'): AxiosInstance => {
  const appUrl = '/'

  return axios.create({
    baseURL: api === 'ya' ? 'https://ya-praktikum.tech/api/v2' : appUrl,
    timeout: 5000,
    withCredentials: true,
  })
}
