import axios from 'axios'

const API_ROOT = 'https://ya-praktikum.tech/api/v2/'

export class YandexApi {
  constructor(private _cookieHeader: string | undefined) {}

  async getCurrent(): Promise<any> {
    try {
      const { data } = await axios.get(`${API_ROOT}auth/user`, {
        headers: {
          cookie: this._cookieHeader,
        },
      })
      return {
        ...data,
      }
    } catch (err) {
      return {
        message: 'Не удалось найти пользователя',
        error: err,
      }
    }
  }
}
