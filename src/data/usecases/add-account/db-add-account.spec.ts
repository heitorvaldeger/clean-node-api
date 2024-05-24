import { IAccountModel, IAddAccountModel, IHasher, IAddAccountRepository } from './db-add-account-interfaces'
import { DbAddAccount } from './db-add-account'

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
  dbAddAccount: DbAddAccount
  addAccountRepositoryStub: IAddAccountRepository
}

const makeSut = (): SutTypes => {
  const HasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const dbAddAccount = new DbAddAccount(HasherStub, addAccountRepositoryStub)

  return {
    HasherStub,
    dbAddAccount,
    addAccountRepositoryStub
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
    const { HasherStub, dbAddAccount } = makeSut()
    const hashSpy = jest.spyOn(HasherStub, 'hash')

    await dbAddAccount.add(fakeAccountData)

    expect(hashSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Hasher throws', async () => {
    const { HasherStub, dbAddAccount } = makeSut()
    jest.spyOn(HasherStub, 'hash').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const accountPromise = dbAddAccount.add(fakeAccountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, dbAddAccount } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await dbAddAccount.add(fakeAccountData)

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, dbAddAccount } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const accountPromise = dbAddAccount.add(fakeAccountData)

    await expect(accountPromise).rejects.toThrow()
  })

  test('Should an account on success', async () => {
    const { dbAddAccount } = makeSut()

    const account = await dbAddAccount.add(fakeAccountData)

    expect(account).toEqual(fakeAccount)
  })
})
