import { Topic } from '../models/Topic'
import { Section } from '../models/Section'

export type SetOrUpdateSectionParam = {
  userId: number
  usernick: string
  sectionname: string
}
export type DeleteSectionParam = {
  id: number
}

class ForumController {
  async getAllSections() {
    const sections = await Section.findAll({
      include: [
        {
          model: Topic,
        },
      ],
      order: [['id', 'ASC']],
    })
    return sections
  }

  async addSection(data: SetOrUpdateSectionParam) {
    const newSection = await Section.create(data)
    return newSection
  }

  async deleteSection({ id }: DeleteSectionParam) {
    const idRemovedSection = await Section.destroy({
      where: { id: id },
    })
    return idRemovedSection
  }
}

export default new ForumController()
