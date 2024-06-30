import { Knex, knex } from 'knex'
import dotenv from 'dotenv'

export const PostgresHelper = {
  client: null as unknown as Knex,
  connect () {
    try {
      dotenv.config()
      this.client = knex({
        client: 'pg',
        connection: {
          host: process.env.POSTGRES_HOST,
          database: process.env.POSTGRES_DATABASE,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          port: Number(process.env.POSTGRES_PORT),
          ssl: false
        }
      })
    } catch (error) {
      throw new Error('Unable to connect to database')
    }
  },
  async disconnect () {
    await this.client.destroy()
    this.client = null as unknown as Knex
  },
  getTable (tableName: string) {
    if (!this.client) {
      this.connect()
    }

    return this.client.table(tableName)
  }
}
