import {
  IAuthentication,
  IHashComparer,
  IEncrypter,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
  IAccountModel
} from './db-authentication-interfaces'
import { DbAuthentication } from './db-authentication'

const fakeAccount: IAccountModel = {
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'hashed_password'
}

class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
  async loadByEmail (email: string): Promise<IAccountModel> {
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}

class HashComparerStub implements IHashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return await new Promise(resolve => { resolve(true) })
  }
}

class EncrypterStub implements IEncrypter {
  async encrypt (id: string): Promise<string> {
    return await new Promise(resolve => { resolve('any_token') })
  }
}

class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    await new Promise(resolve => { resolve(null) })
  }
}

interface SutTypes {
  sut: IAuthentication
  hashComparerStub: IHashComparer
  encrypterStub: IEncrypter
  updateAccessTokenRepositoryStub: IUpdateAccessTokenRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  const hashComparerStub = new HashComparerStub()
  const encrypterStub = new EncrypterStub()
  const updateAccessTokenRepositoryStub = new UpdateAccessTokenRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)

  return {
    sut,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should calls LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const authPromise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    await expect(authPromise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
    const accessToken = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(accessToken).toBeNull()
  })

  test('Should calls HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const authPromise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    await expect(authPromise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(new Promise(resolve => { resolve(false) }))
    const accessToken = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(accessToken).toBeNull()
  })

  test('Should calls Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(encryptSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const authPromise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    await expect(authPromise).rejects.toThrow()
  })

  test('Should calls UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const authPromise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    await expect(authPromise).rejects.toThrow()
  })

  test('Should returns a token on success', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(accessToken).toBe('any_token')
  })
})
