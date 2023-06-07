export interface User {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export interface RequestLoginData {
  login: string
  password: string
}
export interface RequestOAuthData {
  code: string
  redirect_uri: string
}

export interface RequestUpdateUserData {
  data: Omit<User, 'avatar'>
}

export interface RequestCreateUserData {
  data: Omit<User, 'avatar' | 'display_name'>
}

export interface RequestUpdatePasswordData {
  oldPassword: string
  newPassword: string
}
