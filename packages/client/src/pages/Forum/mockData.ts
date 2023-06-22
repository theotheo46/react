import { IForumMessages } from '../../components/ForumChatBlock'

interface IForumSections {
  id: string
  name: string
  user: string
  userId: string
  timestamp: string
  topics: string[]
}
interface IForumTopics {
  id: string
  name: string
  user: string
  userId: string
  timestamp: string
  messages: string[]
}

const mockMessages: IForumMessages[] = [
  {
    id: 2,
    topicId: 1,
    replyID: null,
    userId: 111,
    usernick: 'theo',
    messagetext: 'blablabla1',
    createdAt: '2023-12-21T20:15:53.320',
    updatedAt: '2023-06-18T07:05:52.380',
    parentReply: {
      id: 1,
      parentMessageID: 2,
      createdAt: '2023-06-18T07:06:26.297',
      updatedAt: '2023-06-18T07:06:26.297',
      messages: [
        {
          id: 5,
          topicId: null,
          replyID: 2,
          userId: 222,
          usernick: 'Илья Орехов',
          messagetext: 'blablablaReply2',
          createdAt: '2023-06-18T07:06:26.346',
          updatedAt: '2023-06-18T07:06:26.346',
        },
        {
          id: 6,
          topicId: null,
          replyID: 2,
          userId: 111,
          usernick: 'theo',
          messagetext: 'blablablaReply3',
          createdAt: '2023-06-18T07:06:26.346',
          updatedAt: '2023-06-18T07:06:26.346',
        },
      ],
    },
  },
  {
    id: 4,
    topicId: 1,
    replyID: null,
    userId: 222,
    usernick: 'Илья Орехов',
    messagetext: 'blablabla1',
    createdAt: '2023-12-21T20:15:53.320',
    updatedAt: '2023-12-21T20:15:53.320',
    parentReply: {
      id: 2,
      parentMessageID: 4,
      createdAt: '2023-12-21T20:15:53.320',
      updatedAt: '2023-12-21T20:15:53.320',
      messages: [
        {
          id: 5,
          topicId: null,
          replyID: 2,
          userId: 111,
          usernick: 'theo',
          messagetext: 'blablablaReply2',
          createdAt: '2023-12-21T20:15:53.320',
          updatedAt: '2023-12-21T20:15:53.320',
        },
      ],
    },
  },
  {
    id: 5,
    topicId: 1,
    replyID: null,
    userId: 111,
    usernick: 'theo',
    messagetext: 'blablabla1',
    createdAt: '2023-12-21T20:15:53.320',
    updatedAt: '2023-12-21T20:15:53.320',
    parentReply: {
      id: 3,
      parentMessageID: 5,
      createdAt: '2023-12-21T20:15:53.320',
      updatedAt: '2023-12-21T20:15:53.320',
      messages: [
        {
          id: 6,
          topicId: null,
          replyID: 3,
          userId: 222,
          usernick: 'Илья Орехов',
          messagetext: 'blablablaReply2',
          createdAt: '2023-12-21T20:15:53.320',
          updatedAt: '2023-12-21T20:15:53.320',
        },
        {
          id: 7,
          topicId: null,
          replyID: 3,
          userId: 111,
          usernick: 'theo',
          messagetext: 'blablablaReply3',
          createdAt: '2023-12-21T20:15:53.320',
          updatedAt: '2023-12-21T20:15:53.320',
        },
        {
          id: 8,
          topicId: null,
          replyID: 3,
          userId: 222,
          usernick: 'Илья Орехов',
          messagetext: 'blablablaReply2',
          createdAt: '2023-12-21T20:15:53.320',
          updatedAt: '2023-12-21T20:15:53.320',
        },
        {
          id: 8,
          topicId: null,
          replyID: 3,
          userId: 111,
          usernick: 'theo',
          messagetext: 'blablablaReply3',
          createdAt: '2023-12-21T20:15:53.320',
          updatedAt: '2023-12-21T20:15:53.320',
        },
      ],
    },
  },
]
const mockTopics: IForumTopics[] = [
  {
    id: '1',
    name: 'Тема 1',
    user: 'Дмитрий Козицкий',
    userId: '1',
    timestamp: '2023-12-21T20:15:53.320',
    messages: [
      'Сообщение',
      'Сообщение2',
      'Сообщение3',
      'Сообщение4',
      'Сообщение5',
      'Сообщение6',
      'Сообщение7',
      'Сообщение8',
      'Сообщение9',
      'Сообщение10',
    ],
  },
  {
    id: '2',
    name: 'Тема 2',
    user: 'Илья Орехов',
    userId: '2',
    timestamp: '2023-12-21T20:15:53.320',
    messages: [
      'Сообщение21',
      'Сообщение22',
      'Сообщение23',
      'Сообщение24',
      'Сообщение25',
      'Сообщение26',
      'Сообщение27',
      'Сообщение28',
      'Сообщение29',
      'Сообщение30',
      'Сообщение31',
      'Сообщение32',
      'Сообщение22',
      'Сообщение23',
      'Сообщение24',
      'Сообщение25',
      'Сообщение26',
      'Сообщение27',
      'Сообщение28',
      'Сообщение29',
      'Сообщение30',
      'Сообщение31',
      'Сообщение32',
    ],
  },
  {
    id: '3',
    name: 'Тема 3',
    user: 'Илья Орехов',
    userId: '2',
    timestamp: '2023-12-21T20:15:53.320',
    messages: [
      'Сообщение',
      'Сообщение2',
      'Сообщение3',
      'Сообщение4',
      'Сообщение5',
      'Сообщение6',
      'Сообщение7',
      'Сообщение8',
    ],
  },
]
const mockSections: IForumSections[] = [
  {
    id: '1',
    name: 'Новые игры',
    user: 'Дмитрий Козицкий',
    userId: '1',
    timestamp: '2023-12-21T20:15:53.320',
    topics: ['Предложения', 'Новости', 'Общение', 'Идеи'],
  },
  {
    id: '2',
    name: 'Геймдизайнеры',
    user: 'Илья Орехов',
    userId: '2',
    timestamp: '2023-12-21T20:15:53.320',
    topics: [
      'Предложения',
      'Вопрос команде разработчиков',
      'Мемчики про геймдезингеров',
      'Новости',
      'Общение',
      'Идеи',
    ],
  },
  {
    id: '3',
    name: 'Технологии',
    user: 'Артем Журавлев',
    userId: '3',
    timestamp: '2023-12-21T20:15:53.320',
    topics: [
      'Предложения',
      'Вопрос команде разработчиков',
      'Мемчики про технологиям',
      'Новости',
      'Общение',
      'Идеи',
    ],
  },
  {
    id: '4',
    name: 'Игровые механики',
    user: 'Ксения',
    userId: '4',
    timestamp: '2023-12-21T20:15:53.320',
    topics: [
      'Предложения',
      'Вопрос команде разработчиков',
      'Мемчики по игровым механикам',
      'Новости',
      'Общение',
      'Идеи',
    ],
  },
]
const mockData = { mockSections, mockTopics, mockMessages }
export default mockData
