import { createSlice, PayloadAction, AnyAction } from '@reduxjs/toolkit'
import { IForumMessage, IForumSection, IForumTopic } from './types'
import {
  addMessage,
  addSection,
  addTopic,
  deleteMessage,
  deleteSection,
  deleteTopic,
  getAllMessages,
  getAllSections,
  getAllTopics,
  updateMessage,
} from './forumAsyncThunks'

interface ForumState {
  sections: IForumSection[]
  selectSection: IForumSection | null
  topics: IForumTopic[]
  selectTopic: IForumTopic | null
  messages: IForumMessage[]
  error: string
  isPending: boolean
}

const initialState: ForumState = {
  sections: [],
  selectSection: null,
  topics: [],
  selectTopic: null,
  messages: [],
  error: '',
  isPending: false,
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    getSelectSectionFromLS: state => {
      const section = localStorage.getItem('select-section')
      if (section) {
        state.selectSection = JSON.parse(section)
      }
    },
    setSelectSectionToLS: (state, action: PayloadAction<number>) => {
      const section = state.sections.find(
        section => section.id == action.payload
      )
      if (!section) return
      localStorage.setItem('select-selection', JSON.stringify(section))
      state.selectSection = section
    },
    getSelectTopicFromLS: state => {
      const topic = localStorage.getItem('select-topic')
      if (topic) {
        state.selectTopic = JSON.parse(topic)
      }
    },
    setSelectTopicToLS: (state, action: PayloadAction<number>) => {
      const topic = state.topics.find(topic => topic.id == action.payload)
      if (!topic) return
      localStorage.setItem('select-topic', JSON.stringify(topic))
      state.selectTopic = topic
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addSection.fulfilled, (state, action) => {
        state.sections.push(action.payload)
        state.isPending = false
        state.error = ''
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        const sectionWithIdIndex = state.sections.findIndex(
          section => section.id === action.payload.id
        )
        if (sectionWithIdIndex > -1) {
          state.sections.splice(sectionWithIdIndex, 1)
        }
        state.isPending = false
        state.error = ''
      })
      .addCase(getAllSections.fulfilled, (state, action) => {
        state.sections = action.payload
        state.isPending = false
        state.error = ''
      })
      .addCase(getAllTopics.fulfilled, (state, action) => {
        state.topics = action.payload
        state.isPending = false
        state.error = ''
      })
      .addCase(addTopic.fulfilled, (state, action) => {
        state.topics.push(action.payload)
        state.isPending = false
        state.error = ''
      })
      .addCase(deleteTopic.fulfilled, (state, action) => {
        const topicWithIdIndex = state.topics.findIndex(
          topic => topic.id === action.payload.id
        )
        if (topicWithIdIndex > -1) {
          state.topics.splice(topicWithIdIndex, 1)
        }
        state.isPending = false
        state.error = ''
      })
      .addCase(getAllMessages.fulfilled, (state, action) => {
        state.messages = action.payload
        state.isPending = false
        state.error = ''
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload)
        state.isPending = false
        state.error = ''
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const messageWithIdIndex = state.messages.findIndex(
          message => message.id === action.payload.id
        )
        if (messageWithIdIndex > -1) {
          state.messages.splice(messageWithIdIndex, 1)
        }
        state.isPending = false
        state.error = ''
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        const messageWithIdIndex = state.messages.findIndex(
          message => message.id === action.payload.id
        )
        state.messages[messageWithIdIndex] = action.payload
        state.isPending = false
        state.error = ''
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload
        state.isPending = false
      })
      .addMatcher(isPending, state => {
        state.isPending = true
        state.error = ''
      })
  },
})

export const {
  getSelectSectionFromLS,
  getSelectTopicFromLS,
  setSelectSectionToLS,
  setSelectTopicToLS,
} = forumSlice.actions

export default forumSlice.reducer

function isError(action: AnyAction) {
  return action.type.endsWith('rejected')
}

function isPending(action: AnyAction) {
  return action.type.endsWith('pending')
}
