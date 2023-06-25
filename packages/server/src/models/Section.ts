import { Model, Column, Table, DataType, HasMany } from 'sequelize-typescript'
import { Topic } from './Topic'

@Table
export class Section extends Model {
  @Column({ type: DataType.INTEGER })
  userId!: number

  @Column({ type: DataType.STRING(20) })
  usernick!: string

  @Column({ type: DataType.STRING(40) })
  sectionname!: string

  @HasMany(() => Topic)
  topics: Topic[] = []
}
