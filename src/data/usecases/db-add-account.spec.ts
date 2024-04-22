import { IAccountModel, IAddAccountModel, IEncrypter, IAddAccountRepository } from './db-add-account-interfaces'
import { DbAddAccount } from './db-add-account'

class EncrypterStub implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_password') })
  }
}

const makeEncrypter = (): IEncrypter => {
  return new EncrypterStub()
}

class AddAccountRepositoryStub implements IAddAccountRepository {
  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const fakeAccount = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    }

    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}
const makeAddAccountRepository = (): IAddAccountRepository => {
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  encrypterStub: IEncrypter
  dbAddAccount: DbAddAccount
  addAccountRepositoryStub: IAddAccountRepository
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const dbAddAccount = new DbAddAccount(encrypterStub, addAccountRepositoryStub)

  return {
    encrypterStub,
    dbAddAccount,
    addAccountRepositoryStub
  }
}

describe('DbAddAccount UseCases', () => {
  test('Should calls Encrypter with correct password', async () => {
    const { encrypterStub, dbAddAccount } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')

    await dbAddAccount.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { encrypterStub, dbAddAccount } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const accountPromise = dbAddAccount.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    await expect(accountPromise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, dbAddAccount } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')

    await dbAddAccount.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, dbAddAccount } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const accountPromise = dbAddAccount.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    await expect(accountPromise).rejects.toThrow()
  })

  test('Should an account on success', async () => {
    const { dbAddAccount } = makeSut()

    const account = await dbAddAccount.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })
})
