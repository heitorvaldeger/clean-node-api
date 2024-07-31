import { IAccountModel } from '../../../domain/model/account'
import { IDecrypter } from '../../interfaces/crypto/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { ILoadAccountByTokenRepository } from '../../interfaces/db/account/load-account-by-token-repository'

class DecrypterStub implements IDecrypter {
  async decrypt (value: string): Promise<string | null> {
    return await new Promise(resolve => { resolve('any_value') })
  }
}

const fakeAccount: IAccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
}

class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
  async loadByToken (accessToken: string, role?: string): Promise<IAccountModel | null> {
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}

interface SutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: DecrypterStub
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepositoryStub
}
const makeSut = (): SutTypes => {
  const decrypterStub = new DecrypterStub()
  const loadAccountByTokenRepositoryStub = new LoadAccountByTokenRepositoryStub()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)

  return {
    decrypterStub,
    loadAccountByTokenRepositoryStub,
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

  test('Should call LoadAccountByTokenRepository with correct value', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    const loadByToken = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')

    expect(loadByToken).toHaveBeenCalledWith('any_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
    const account = await sut.load('any_token', 'any_role')

    expect(account).toBeNull()
  })
})
