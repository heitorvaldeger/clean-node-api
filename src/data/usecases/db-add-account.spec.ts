import { IEncrypter } from '../interfaces/encrypter'
import { DbAddAccount } from './db-add-account'

class EncrypterStub implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_password') })
  }
}

const makeEncrypter = (): IEncrypter => {
  return new EncrypterStub()
}

interface SutTypes {
  encrypterStub: EncrypterStub
  dbAddAccount: DbAddAccount
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const dbAddAccount = new DbAddAccount(encrypterStub)

  return {
    encrypterStub,
    dbAddAccount
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
})
