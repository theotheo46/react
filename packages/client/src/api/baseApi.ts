import axios, { AxiosInstance } from 'axios'

export const baseApi = (api: 'ya' | 'local' = 'ya'): AxiosInstance => {
  return axios.create({
    baseURL:
      api === 'ya'
        ? 'https://ya-praktikum.tech/api/v2'
        : `http://localhost:${__SERVER_PORT__}`,
    timeout: 5000,
    withCredentials: true,
  })
}
