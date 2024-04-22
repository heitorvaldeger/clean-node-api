import { IEncrypter } from '../interfaces/encrypter'
import { DbAddAccount } from './db-add-account'

class EncrypterStub implements IEncrypter {
  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_password') })
  }
}

describe('DbAddAccount UseCases', () => {
  test('Should calls Encrypter with correct password', async () => {
    const encrypterStub = new EncrypterStub()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const dbAddAccount = new DbAddAccount(encrypterStub)

    await dbAddAccount.add({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })

    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
