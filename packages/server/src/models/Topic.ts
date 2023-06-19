import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript'
import { Section } from './Section'
import { Message } from './Message'

@Table
export class Topic extends Model {
  @ForeignKey(() => Section)
  @Column({ type: DataType.INTEGER })
  sectionId!: number

  @Column({ type: DataType.INTEGER })
  userId!: number

  @Column({ type: DataType.STRING(20) })
  usernick!: string

  @Column({ type: DataType.STRING(20) })
  topicname!: string

  @HasMany(() => Message)
  messages: Message[] = []
}
