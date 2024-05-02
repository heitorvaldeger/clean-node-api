import MongoHelper from './mongodb-helper'

describe('MongoDB Helper', () => {
  test('Should throw an error if MongoDB uri is not defined when connecting', async () => {
    const promise = MongoHelper.connect()
    await expect(promise).rejects.toThrow('MongoDB uri is not defined')
  })
})
