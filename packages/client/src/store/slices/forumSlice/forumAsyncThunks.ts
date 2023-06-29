import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IForumMessage,
  IForumSection,
  IForumTopic,
  RequestDeleteItem,
  RequestAddSection,
  RequestUpdateMessage,
  RequestAddMessage,
  RequestAddTopic,
  RequestAddReply,
  IReply,
  IEmoji,
} from './types'

import { baseApi } from '../../../api/baseApi'

export const getAllSections = createAsyncThunk<
  IForumSection[],
  undefined,
  { rejectValue: string }
>('forum/getAllSections', async (_, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').get('/forum/getallsections')
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const addSection = createAsyncThunk<
  IForumSection,
  RequestAddSection,
  { rejectValue: string }
>('forum/addSection', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post('/forum/addsection', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const deleteSection = createAsyncThunk<
  RequestDeleteItem,
  RequestDeleteItem,
  { rejectValue: string }
>('forum/deleteSection', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post('/forum/deletesection', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const getAllTopics = createAsyncThunk<
  IForumTopic[],
  { sectionId: number },
  { rejectValue: string }
>('forum/getAllTopics', async ({ sectionId }, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').get(
      `/forum/getalltopicsbysectionid?sectionId=${sectionId}`
    )
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const addTopic = createAsyncThunk<
  IForumTopic,
  RequestAddTopic,
  { rejectValue: string }
>('forum/addTopic', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post('/forum/addtopic', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const deleteTopic = createAsyncThunk<
  RequestDeleteItem,
  RequestDeleteItem,
  { rejectValue: string }
>('forum/deleteTopic', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post('/forum/deletetopic', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const getAllMessages = createAsyncThunk<
  IForumMessage[],
  { topicId: number },
  { rejectValue: string }
>('forum/getAllMessages', async ({ topicId }, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').get(
      `/forum/getallmessagesbytopicid?topicId=${topicId}`
    )
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const addMessage = createAsyncThunk<
  IForumMessage,
  RequestAddMessage,
  { rejectValue: string }
>('forum/addMessage', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post('/forum/addmessage', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const addReply = createAsyncThunk<
  IReply,
  RequestAddReply,
  { rejectValue: string }
>('forum/addReply', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post('/forum/addreply', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const deleteMessage = createAsyncThunk<
  RequestDeleteItem,
  RequestDeleteItem,
  { rejectValue: string }
>('forum/deleteMessage', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post('/forum/deletemessage', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const updateMessage = createAsyncThunk<
  IForumMessage,
  RequestUpdateMessage,
  { rejectValue: string }
>('forum/updateMessage', async (data, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').post('/forum/updatemessage', data)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})

export const getEmojies = createAsyncThunk<
  IEmoji[],
  undefined,
  { rejectValue: string }
>('emoji/getEmojies', async (_, { rejectWithValue }) => {
  try {
    const response = await baseApi('local').get(`/emoji`)
    return response.data
  } catch (error) {
    return rejectWithValue((error as Error).message)
  }
})
