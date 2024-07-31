import { IDecrypter } from '../../interfaces/crypto/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

class DecrypterStub implements IDecrypter {
  async decrypt (value: string): Promise<string> {
    return await new Promise(resolve => { resolve('any_value') })
  }
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: DecrypterStub
}
const makeSut = (): SutTypes => {
  const decrypterStub = new DecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)

  return {
    decrypterStub,
    sut
  }
}

describe('DbLoadAccountByToken', () => {
  test('Should call Decrypter with correct value', async () => {
    const { decrypterStub, sut } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')

    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
