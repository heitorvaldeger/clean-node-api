/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { PostgresHelper } from './postgres-helper'

describe('PostgresHelper', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  test('Should throw an error if Postgres don\'t connect throws', () => {
    jest.spyOn(PostgresHelper, 'connect').mockImplementationOnce(() => {
      throw new Error('Unable to connect to database')
    })
    expect(() => PostgresHelper.connect()).toThrow('Unable to connect to database')
  })
})
