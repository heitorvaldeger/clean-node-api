import { PostgresHelper } from './postgres-helper'
import { knex } from 'knex'

describe('PostgresHelper', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  test('Should throw an error if Postgres don\'t connect throws', () => {
    jest.spyOn(knex, 'knex').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(() => { PostgresHelper.connect() }).toThrow('Unable to connect to database')
  })

  test('Should reconnect if Postgres is down', async () => {
    await PostgresHelper.disconnect()

    const accountTable = PostgresHelper.getTable('accounts')
    expect(accountTable).toBeTruthy()
  })
})
