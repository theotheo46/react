import { Model, Column, Table, DataType } from 'sequelize-typescript'

@Table
export class Leaderboard extends Model<Leaderboard> {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  override id!: number

  @Column({ type: DataType.INTEGER })
  userId!: number

  @Column({ type: DataType.STRING })
  usernick!: string

  @Column({ type: DataType.INTEGER })
  level!: number

  @Column({ type: DataType.INTEGER })
  steps!: number

  @Column({ type: DataType.INTEGER })
  time!: number

  @Column({ type: DataType.INTEGER })
  score!: number
}
