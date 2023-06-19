import { Router } from 'express'
import { Section } from '../models/Section'
import { Topic } from '../models/Topic'
import { Message } from '../models/Message'
import { Reply } from '../models/Reply'

export const forum = Router()

forum.post('/addsection', async (req, res) => {
  //BODY is {"usernick" : "theo", "sectionname" : "Section1"}
  Section.create(req.body)
    .then(section => {
      return res.status(201).json(section)
    })
    .catch(err => {
      return res.status(400).json({ err })
    })
})

forum.post('/deletesection', async (req, res) => {
  //BODY is {"id" : "1"}
  const id = req.body.id
  if (id === undefined) {
    return res
      .status(400)
      .json({ error: 'id должен быть определен в body запроса' })
  } else {
    return Section.destroy({
      where: {
        id: +id,
      },
    })
      .then(section => {
        return res.status(201).json(section)
      })
      .catch(err => {
        return res.status(400).json({ err })
      })
  }
})

forum.post('/deletetopic', async (req, res) => {
  //BODY is {"id" : "1"}
  const id = req.body.id
  if (id === undefined) {
    return res
      .status(400)
      .json({ error: 'id должен быть определен в body запроса' })
  } else {
    return Topic.destroy({
      where: {
        id: +id,
      },
    })
      .then(topic => {
        return res.status(201).json(topic)
      })
      .catch(err => {
        return res.status(400).json({ err })
      })
  }
})

forum.post('/deletemessage', async (req, res) => {
  //BODY is {"id" : "1"}
  const id = req.body.id
  if (id === undefined) {
    return res
      .status(400)
      .json({ error: 'id должен быть определен в body запроса' })
  } else {
    return Message.destroy({
      where: {
        id: +id,
      },
    })
      .then(message => {
        return res.status(201).json(message)
      })
      .catch(err => {
        return res.status(400).json({ err })
      })
  }
})

forum.post('/addtopic', async (req, res) => {
  //BODY is {"usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}
  Topic.create(req.body)
    .then(topic => {
      return res.status(201).json(topic)
    })
    .catch(err => {
      return res.status(400).json({ err })
    })
})

forum.post('/addmessage', async (req, res) => {
  //BODY is {"userId" : "111", "usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}
  Message.create(req.body)
    .then(message => {
      return res.status(201).json(message)
    })
    .catch(err => {
      return res.status(400).json({ err })
    })
})

forum.post('/updatemessage', async (req, res) => {
  //BODY is {"userId" : "111", "messagetext" : "blablabla", "id" : "1"}
  const { userId, messagetext, id } = req.body
  Message.findByPk(id)
    .then(message => {
      if (message?.userId !== +userId) {
        throw `userId ${userId} в параметре запроса не равен userId ${message?.userId} объекта Message`
      }
      message?.update({ messagetext: messagetext })
    })
    .then(message => {
      return res.status(201).json(message)
    })
    .catch(err => {
      return res.status(400).json({ err })
    })
})

forum.get('/getallsections', async (_req, res) => {
  Section.findAll({
    include: [
      {
        model: Topic,
      },
    ],
    order: [['id', 'ASC']],
  })
    .then(section => {
      return res.status(201).json(section)
    })
    .catch(err => {
      return res.status(400).json({ err })
    })
})

forum.get('/getalltopicsbysectionid', async (req, res) => {
  const sectionId = req.query.sectionId
  if (sectionId === undefined) {
    return res
      .status(400)
      .json({ error: 'sectionId должен быть определен в параметрах запроса' })
  } else {
    return Topic.findAll({
      where: {
        sectionId: +sectionId,
      },
      order: [['id', 'ASC']],
    })
      .then(topics => {
        return res.status(201).json(topics)
      })
      .catch(err => {
        return res.status(400).json({ err })
      })
  }
})

forum.get('/getallmessagesbytopicid', async (req, res) => {
  const topicId = req.query.topicId
  if (topicId === undefined) {
    return res
      .status(400)
      .json({ error: 'topicId должен быть определен в параметрах запроса' })
  } else {
    return Message.findAll({
      where: {
        topicId: +topicId,
      },
      include: [
        {
          model: Reply,
          as: 'parentReply',
          include: [{ model: Message, as: 'messages' }],
        },
      ],
      order: [['id', 'ASC']],
    })
      .then(messages => {
        return res.status(201).json(messages)
      })
      .catch(err => {
        return res.status(400).json({ err })
      })
  }
})

forum.post('/addreply', async (req, res) => {
  //BODY is {"userId" : "111", "usernick" : "theo", "messagetext" : "blablabla11111111", "messageId" : "1"}
  const { messageId, ...message } = req.body
  const parentMessage = await Message.findByPk(messageId)
  if (parentMessage === null) {
    return res
      .status(400)
      .json({ err: `Message with id = ${messageId} is not found in DB` })
  } else {
    try {
      const parentReply = await parentMessage.$get('parentReply')
      let replyID
      if (parentReply === null) {
        //у данного сообщения нет реплая - надо создать новый реплай и связать его с существующим сообщением, после этого сохраним id этого реплая
        const reply = await Reply.create({ parentMessageID: messageId })
        replyID = reply.id
      } else {
        // у данного сообщения есть реплай - возьмем  id этого реплая
        replyID = parentReply.id
      }
      message.replyID = replyID
      const mess = await Message.create(message) //создаем новое сообщение которое добавляется в список чайлдов для данного реплая
      return res.status(201).json(mess)
    } catch (err) {
      return res.status(400).json({ err })
    }
  }
})
