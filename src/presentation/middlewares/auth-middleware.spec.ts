import { forbidden } from '../helpers/http/http-helpers'
import { AccessDeniedError } from '../errors'
import { AuthMiddleware } from './auth-middleware'
import { IAccountModel } from '../../domain/model/account'
import { ILoadAccountByToken } from '../../domain/usecases/interfaces/load-account-by-token'
import { IHttpRequest } from '../helpers/http/interfaces/http'

class LoadAccountByTokenStub implements ILoadAccountByToken {
  async load (accessToken: string, role?: string): Promise<IAccountModel> {
    return await new Promise(resolve => {
      resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      })
    })
  }
}

const makeFakeRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

interface SutTypes {
  sut: AuthMiddleware
  loadAccountByTokenStub: ILoadAccountByToken
}

const makeSut = (): SutTypes => {
  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())

    expect(loadSpy).toHaveBeenCalledWith('any_token')
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => { resolve(null) }))
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
