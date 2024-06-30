import { createHash } from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT ?? 5050,
  jwtSecret: process.env.JWT_SECRET ?? createHash('sha512').digest('base64'),
  dbPostgres: {
    dbHost: process.env.POSTGRES_HOST,
    dbDatabase: process.env.POSTGRES_DATABASE,
    dbUser: process.env.POSTGRES_USER,
    dbPassword: process.env.POSTGRES_PASSWORD,
    dbPort: Number(process.env.POSTGRES_PORT),
    ddSsl: false
  }
}
