import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript'
import { Topic } from './Topic'
import { Reply } from './Reply'

@Table
export class Message extends Model {
  @ForeignKey(() => Topic)
  @Column({ type: DataType.INTEGER })
  topicId!: number

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.INTEGER,
    onDelete: 'CASCADE',
  })
  replyID!: number

  @BelongsTo(() => Reply, 'replyID')
  reply: Reply | undefined

  @HasOne(() => Reply, 'parentMessageID')
  parentReply: Reply | undefined

  @Column({ type: DataType.INTEGER })
  userId!: number

  @Column({ type: DataType.STRING(20) })
  usernick!: string

  @Column({ type: DataType.STRING(200) })
  messagetext!: string
}
