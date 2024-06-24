import knex, { Knex } from 'knex'
import dotenv from 'dotenv'

export const PostgresHelper = {
  client: null as unknown as Knex,
  connect () {
    dotenv.config()
    const postgresPort = Number(process.env.POSTGRES_PORT)
    this.client = knex({
      client: 'pg',
      connection: {
        host: process.env.POSTGRES_HOST,
        database: process.env.POSTGRES_DATABASE,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        port: postgresPort,
        ssl: false
      }
    })
  },
  async disconnect () {
    await this.client.destroy()
  },
  getTable (tableName: string) {
    if (!this.client) {
      this.connect()
    }

    return this.client.table(tableName)
  }
}
