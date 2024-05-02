import { MongoHelper } from '../helpers/mongodb-helper'
import { AccountMongoRepository } from './account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts').deleteMany()
  })

  test('Should return an account on success', async () => {
    const sut = new AccountMongoRepository()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should throw an error when account not found', async () => {
    jest.spyOn(MongoHelper, 'getCollection').mockImplementationOnce((name) => {
      const accountCollection = MongoHelper.getCollection(name)
      accountCollection.findOne = jest.fn(async () => null)
      return accountCollection
    })

    const sut = new AccountMongoRepository()

    const accountAdd = sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    await expect(accountAdd).rejects.toThrow('Account not found')
  })
})
