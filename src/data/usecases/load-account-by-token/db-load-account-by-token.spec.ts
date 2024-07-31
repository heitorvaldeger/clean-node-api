import { IDecrypter } from '../../interfaces/crypto/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

class DecrypterStub implements IDecrypter {
  async decrypt (value: string): Promise<string | null> {
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
    await sut.load('any_token', 'any_role')

    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { decrypterStub, sut } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
    const account = await sut.load('any_token', 'any_role')

    expect(account).toBeNull()
  })
})
