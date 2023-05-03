import axios, { AxiosInstance } from 'axios'

export const baseApi: AxiosInstance = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  timeout: 5000,
  withCredentials: true
})
