import { IAuthentication } from '../../../domain/usecases/interfaces/authentication'
import { IHashComparer } from '../../interfaces/crypto/hash-comparer'
import { ITokenGenerator } from '../../interfaces/crypto/token-generator'
import { ILoadAccountByEmailRepository } from '../../interfaces/db/load-account-by-email-repository'
import { IAccountModel } from '../add-account/db-add-account-interfaces'
import { DbAuthentication } from './db-authentication'

const fakeAccount: IAccountModel = {
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'hashed_password'
}

class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
  async load (email: string): Promise<IAccountModel> {
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}

class HashComparerStub implements IHashComparer {
  async compare (value: string, hash: string): Promise<boolean> {
    return await new Promise(resolve => { resolve(true) })
  }
}

class TokenGeneratorStub implements ITokenGenerator {
  async generate (id: string): Promise<string> {
    return await new Promise(resolve => { resolve('any_token') })
  }
}

interface SutTypes {
  sut: IAuthentication
  hashComparerStub: IHashComparer
  tokenGeneratorStub: ITokenGenerator
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  const hashComparerStub = new HashComparerStub()
  const tokenGeneratorStub = new TokenGeneratorStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, tokenGeneratorStub)

  return {
    sut,
    hashComparerStub,
    tokenGeneratorStub,
    loadAccountByEmailRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should calls LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const authPromise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    await expect(authPromise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
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

  test('Should calls TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if TokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const authPromise = sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password'
    })

    await expect(authPromise).rejects.toThrow()
  })
})
