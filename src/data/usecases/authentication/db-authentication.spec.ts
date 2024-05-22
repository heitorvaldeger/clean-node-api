import { IAuthentication } from '../../../domain/usecases/interfaces/authentication'
import { ILoadAccountByEmailRepository } from '../../interfaces/load-account-by-email-repository'
import { IAccountModel } from '../db-add-account-interfaces'
import { DbAuthentication } from './db-authentication'

const fakeAccount: IAccountModel = {
  id: 'any_id',
  email: 'any_email@mail.com',
  name: 'any_name',
  password: 'any_password'
}

class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
  async load (email: string): Promise<IAccountModel> {
    return await new Promise(resolve => { resolve(fakeAccount) })
  }
}

interface SutTypes {
  sut: IAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
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
})
