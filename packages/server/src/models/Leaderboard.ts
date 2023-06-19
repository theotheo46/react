import { Model, Column, Table, DataType } from 'sequelize-typescript'

@Table
export class Leaderboard extends Model {
  @Column({ type: DataType.INTEGER })
  userId!: number

  @Column({ type: DataType.STRING(20) })
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
