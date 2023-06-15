import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_HOST } =
  process.env

export const sequelize = new Sequelize(
  POSTGRES_DB!,
  POSTGRES_USER!,
  POSTGRES_PASSWORD,
  {
    host: POSTGRES_HOST,
    dialect: 'postgres',
    models: [__dirname + '/src/models'],
    define: {
      timestamps: true,
      freezeTableName: true,
    },
  }
)
