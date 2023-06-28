import {
  Model,
  Table,
  DataType,
  Column,
  PrimaryKey,
  AutoIncrement,
  Index,
  AllowNull,
  Unique,
} from 'sequelize-typescript'

@Table
export class Emoji extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'emoji_id' })
  emojiId!: number

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  slug!: string

  @Index
  @AllowNull(false)
  @Column(DataType.STRING)
  character!: string

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  unicodeName!: string

  @Column(DataType.STRING)
  group!: string

  @Column(DataType.STRING)
  subGroup!: string
}
