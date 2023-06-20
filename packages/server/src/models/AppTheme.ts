import {
  Model,
  Column,
  Table,
  DataType,
  AutoIncrement,
  PrimaryKey,
  AllowNull,
  Unique,
  Index,
} from 'sequelize-typescript'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'app_theme',
})
export default class AppTheme extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column({ type: DataType.INTEGER, field: 'theme_id' })
  themeId!: number

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string
}
