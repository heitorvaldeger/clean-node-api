import { Collection } from 'mongodb'
import MongoHelper from '../helpers/mongodb-helper'
import { LogMongoRepository } from './log-mongo-repository'

describe('Log MongoDB Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')

    const countErrors = await errorCollection.countDocuments()
    expect(countErrors).toBe(1)
  })
})
