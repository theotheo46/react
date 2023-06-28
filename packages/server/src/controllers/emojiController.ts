import { Emoji } from '../models/Emoji'

export type EmojiDataParam = {
  emojiId: number
  slug: string
  character: string
  unicodeName: string
  codePoint: string
  group: string
  subGroup: string
}

class EmojiController {
  async getAllEmoji() {
    const Emojies = await Emoji.findAll()
    return Emojies
  }

  async initEmoji() {
    const apiKey = '1b1e8f2e44dd30ba1f8c91a975d21c0b11429f38'
    let emojiData: EmojiDataParam[] = []
    await fetch(`https://emoji-api.com/emojis?access_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        emojiData = data as EmojiDataParam[]
      }) // Получение массива эмоджи
    if (emojiData) {
      await Emoji.bulkCreate([...emojiData]) // TODO добавить массив с эмоджи
    }
  }
}

export default new EmojiController()
