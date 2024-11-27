import { mockDecrypt, mockLoadAccountByTokenRepositoryStub } from '#data/test'
import { mockAccountModel } from '#domain/test'
import { IDecrypter, ILoadAccountByTokenRepository } from './db-load-account-by-interfaces'

import { DbLoadAccountByToken } from './db-load-account-by-token'

type SutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
  loadAccountByTokenRepositoryStub: ILoadAccountByTokenRepository
}
const makeSut = (): SutTypes => {
  const decrypterStub = mockDecrypt()
  const loadAccountByTokenRepositoryStub = mockLoadAccountByTokenRepositoryStub()
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
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
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
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockReturnValueOnce(Promise.resolve(null))
    const account = await sut.load('any_token', 'any_role')

    expect(account).toBeNull()
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')

    expect(account).toEqual(mockAccountModel())
  })

  test('Should throw if Decrypter throws', async () => {
    const { decrypterStub, sut } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(() => { throw new Error() })

    const account = await sut.load('any_token', 'any_role')

    expect(account).toBeFalsy()
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { loadAccountByTokenRepositoryStub, sut } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(() => { throw new Error() })

    const accountPromise = sut.load('any_token', 'any_role')

    await expect(accountPromise).rejects.toThrow()
  })
})
