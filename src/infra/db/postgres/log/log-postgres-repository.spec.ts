import { LogPostgresRepository } from './log-postgres-repository'
import { PostgresHelper } from '../helpers/postgres-helper'

describe('Log Postgres Repository', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

  beforeEach(async () => {
    await PostgresHelper.getTable('errors').whereNotNull('id').del()
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  test('Should create an error log on success', async () => {
    const sut = new LogPostgresRepository()
    await sut.logError('any_error')

    const countErrors = (await PostgresHelper.getTable('errors').count())[0].count as string
    expect(Number(countErrors)).toBe(1)
  })
})
