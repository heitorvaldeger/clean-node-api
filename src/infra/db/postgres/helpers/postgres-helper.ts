import pg from 'pg'
import { Knex, knex } from 'knex'
import dotenv from 'dotenv'

// The OID 20 corresponds the 'bigint' type on PostgresSQL
const BIGINT_OID = 20

pg.types.setTypeParser(BIGINT_OID, (val) => {
  if (val === null) {
    return null
  }

  const num = Number.parseInt(val, 10)

  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    throw new Error(`BigInt value is out of secure range to Number: ${val}`)
  }

  return num
})

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
          ssl: !!process.env.POSTGRES_SSL
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
  },
  raw (sql: string) {
    return this.client.raw(sql)
  },
  async truncateAllTables () {
    const tables = await this.client.table('information_schema.tables')
      .select('table_name')
      .where('table_schema', 'public')

    // eslint-disable-next-line @typescript-eslint/naming-convention
    for (const { table_name } of tables) {
      await this.client.raw(`TRUNCATE TABLE ${table_name} CASCADE`)
    }
  }
}
