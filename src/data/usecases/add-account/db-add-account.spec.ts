import { IAccountModel, IAddAccountModel, IHasher, IAddAccountRepository, ILoadAccountByEmailRepository } from './db-add-account-interfaces'
import { DbAddAccount } from './db-add-account'

class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<IAccountModel> {
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}

class HasherStub implements IHasher {
  async hash (value: string): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_password') })
  }
}

const makeHasher = (): IHasher => {
  return new HasherStub()
}

class AddAccountRepositoryStub implements IAddAccountRepository {
  async add (account: IAddAccountModel): Promise<IAccountModel> {
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}
const makeAddAccountRepository = (): IAddAccountRepository => {
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  HasherStub: IHasher
  sut: DbAddAccount
  addAccountRepositoryStub: IAddAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  const HasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(HasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)

  return {
    HasherStub,
    sut,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

const fakeAccountData: IAddAccountModel = {
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
}

const fakeAccount: IAccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
}

describe('DbAddAccount UseCases', () => {
  test('Should calls Hasher with correct password', async () => {
    const { HasherStub, sut } = makeSut()
    const hashSpy = jest.spyOn(HasherStub, 'hash')

    await sut.add(fakeAccountData)

    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { HasherStub, sut } = makeSut()
    jest.spyOn(HasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

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

  test('Should an account on success', async () => {
    const { sut } = makeSut()

    const account = await sut.add(fakeAccountData)

    expect(account).toEqual(fakeAccount)
  })
})
