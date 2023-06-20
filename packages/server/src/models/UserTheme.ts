import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript'
import AppTheme from './AppTheme'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export default class UserTheme extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'owner_id' })
  ownerId!: number

  @ForeignKey(() => AppTheme)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'theme_id' })
  themeId!: number
}
