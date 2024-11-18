import { AccountModel, AddAccountParams, IHasher, IAddAccountRepository, ILoadAccountByEmailRepository } from './db-add-account-interfaces'
import { DbAddAccount } from './db-add-account'

class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<AccountModel | null> {
    return await new Promise(resolve => { resolve(null) })
  }
}

class HasherStub implements IHasher {
  async hash (value: string): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_password') })
  }
}

class AddAccountRepositoryStub implements IAddAccountRepository {
  async add (account: AddAccountParams): Promise<AccountModel> {
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}
const makeAddAccountRepository = (): IAddAccountRepository => {
  return new AddAccountRepositoryStub()
}

type SutTypes = {
  hasherStub: IHasher
  sut: DbAddAccount
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  const hasherStub = new HasherStub()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    hasherStub,
    sut,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

const fakeAccountData: AddAccountParams = {
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
}

const fakeAccount: AccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
}

describe('DbAddAccount UseCases', () => {
  test('Should calls Hasher with correct password', async () => {
    const { hasherStub, sut } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')

    await sut.add(fakeAccountData)

    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { hasherStub, sut } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const accountPromise = sut.add(fakeAccountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await sut.add(fakeAccountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const accountPromise = sut.add(fakeAccountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('Should calls LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.add(fakeAccountData)

    expect(loadSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })

  test('Should return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise(resolve => {
        resolve(fakeAccount)
      }))
    const account = await sut.add(fakeAccountData)

    expect(account).toBeNull()
  })

  test('Should an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add(fakeAccountData)

    expect(account).toEqual(fakeAccount)
  })
})
