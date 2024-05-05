import MongoHelper from './mongodb-helper'

describe('MongoDB Helper', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should throw an error if MongoDB uri is not defined when connecting', async () => {
    const promise = MongoHelper.connect()
    await expect(promise).rejects.toThrow('MongoDB uri is not defined')
  })

  test('Should reconnect if mongodb is down ', async () => {
    await MongoHelper.disconnect()

    const accountCollection = await MongoHelper.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
