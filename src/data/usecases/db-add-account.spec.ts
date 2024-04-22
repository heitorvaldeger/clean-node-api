import { IEncrypter } from '../interfaces/encrypter'
import { DbAddAccount } from './db-add-account'

class EncrypterStub implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_password') })
  }
}

interface SutTypes {
  encrypterStub: EncrypterStub
  dbAddAccount: DbAddAccount
}

const makeSut = (): SutTypes => {
  const encrypterStub = new EncrypterStub()
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
})
