import { Model, Table,  HasMany, DataType, Column, ForeignKey,} from 'sequelize-typescript'
import { Message } from './Message'


@Table
export class Reply extends Model {

  @ForeignKey(() => Message)
  @Column({ type: DataType.INTEGER })
  parentMessageID!: number

  @HasMany(() => Message, "replyID")
  messages: Message[] | undefined
}
