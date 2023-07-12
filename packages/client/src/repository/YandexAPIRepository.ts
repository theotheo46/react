import axios from 'axios'
import { UserRepository } from '../api/UserService'
import { User } from '../store/slices/userSlice/types'

export class YandexAPIRepository implements UserRepository {
  async getCurrent(): Promise<User> {
    const { data } = await axios.get(`/api/v2/auth/user`, {
      withCredentials: true,
    })
    return data
  }
}
