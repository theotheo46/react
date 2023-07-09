import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  RequestCreateUserData,
  RequestLoginData,
  RequestOAuthData,
  RequestUpdatePasswordData,
  RequestUpdateUserData,
  User,
  UserThemes,
} from './types'
import { baseApi } from '../../../api/baseApi'
import { UserService } from '../../../api/UserService'

export const getUser = createAsyncThunk<
  User,
  undefined,
  { rejectValue: string }
>('user/getUser', async (_, thunkApi) => {
  try {
    const service: UserService = thunkApi.extra as UserService
    const data = await service.getCurrentUser()
    return data
  } catch (error) {
    return thunkApi.rejectWithValue((error as Error).message)
  }
})

export const logoutUser = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>('user/logoutUser', async (_, { rejectWithValue }) => {
  try {
    const response = await baseApi().post('/auth/logout')
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const loginUser = createAsyncThunk<
  undefined,
  RequestLoginData,
  { rejectValue: string }
>('user/loginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi().post('/auth/signin', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const OAuth = createAsyncThunk<
  undefined,
  RequestOAuthData,
  { rejectValue: string }
>('user/OAuth', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi().post('/oauth/yandex', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const getServiceId = createAsyncThunk<
  { service_id: string },
  undefined,
  { rejectValue: string }
>('user/getServiceId', async (_, { rejectWithValue }) => {
  try {
    const response = await baseApi().get('/oauth/yandex/service-id')
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const createUser = createAsyncThunk<
  { id: number },
  RequestCreateUserData,
  { rejectValue: string }
>('user/createUser', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi().post('/auth/signup', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const updateUser = createAsyncThunk<
  User,
  RequestUpdateUserData,
  { rejectValue: string }
>('user/updateUser', async (data, { rejectWithValue }) => {
  try {
    const respoonse = await baseApi().put<User>('/user/profile', data.data)
    return respoonse.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const updateAvatar = createAsyncThunk<
  User,
  FormData,
  { rejectValue: string }
>('user/updateAvatar', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi().put<User>('/user/profile/avatar', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const updatePassword = createAsyncThunk<
  undefined,
  RequestUpdatePasswordData,
  { rejectValue: string }
>('user/updatePassword', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi().put('/user/password', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const getTheme = createAsyncThunk<
  UserThemes,
  { userId: number },
  { rejectValue: string }
>('user/getTheme', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').get(`api/theme/${data.userId}`)
    return response.data.theme
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const setTheme = createAsyncThunk<
  UserThemes,
  { userId: number; theme: UserThemes },
  { rejectValue: string }
>('user/setTheme', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post(`api/theme`, data)
    return response.data.theme
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})
