import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helpers'
import { LoginControler } from './login'

interface SutTypes {
  sut: LoginControler
}
const makeSut = (): SutTypes => {
  const sut = new LoginControler()

  return {
    sut
  }
}

describe('Login Controller', () => {
  test('Should returns 400 if email is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should returns 400 if password is not provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
