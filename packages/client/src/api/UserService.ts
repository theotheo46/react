import { User } from '../store/slices/userSlice/types'

export interface UserRepository {
  getCurrent(): Promise<User>
}

export class UserService {
  constructor(private _repo: UserRepository) {}
  getCurrentUser() {
    return this._repo.getCurrent()
  }
}
