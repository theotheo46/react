export interface IForumSection {
  id: number
  sectionname: string
  usernick: string
  userId: number
  createdAt: string
  updatedAt: string
  topics: IForumTopic[]
}

export interface RequestAddSection {
  userId: number
  usernick: string
  sectionname: string
}

export interface IForumTopic {
  id: number
  sectionId: number
  userId: number
  usernick: string
  topicname: string
  createdAt: string
  updatedAt: string
  messages: ShortMessage[]
}

export interface RequestAddTopic {
  userId: number
  usernick: string
  topicname: string
  sectionId: number
}

export interface IForumMessage {
  id: number
  topicId: number | null
  replyID: number | null
  userId: number
  usernick: string
  messagetext: string
  createdAt: string
  updatedAt: string
  parentReply?: IReply
}

export interface RequestAddMessage {
  userId: number
  usernick: string
  messagetext: string
  topicId: number
}

export interface RequestAddReply {
  userId: number
  usernick: string
  messagetext: string
  messageId: number
}

export interface RequestUpdateMessage {
  userId: number
  messagetext: string
  id: number
}

export interface IReply {
  id: number
  parentMessageID: number
  createdAt: string
  updatedAt: string
  messages: IForumMessage[]
}

export interface ShortMessage {
  messagetextcut: string
}

export type RequestDeleteItem = {
  id: number
}

export type WritingMode = 'new' | 'update' | 'reply'

export interface IEmoji {
  emojiId: number
  slug: string
  character: string
  unicodeName: string
  codePoint: string
  group: string
  subGroup: string
}
