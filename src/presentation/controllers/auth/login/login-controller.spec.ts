import { AuthenticationModel, AuthenticationParams, IAuthentication } from './login-controller-interfaces'
import { badRequest, ok, serverError, unauthorized } from '#presentation/helpers/http/http-helpers'
import { LoginController } from './login-controller'
import { IValidationComposite } from '#validations/interfaces/validation-composite'
import { ValidationError } from '#validations/interfaces/validation'

class AuthenticationStub implements IAuthentication {
  async auth (authentication: AuthenticationParams): Promise<AuthenticationModel> {
    return await Promise.resolve({
      accessToken: 'any_token',
      name: 'any_name'
    })
  }
}

class ValidationStub implements IValidationComposite {
  validate (input: any): ValidationError[] | null {
    return null
  }
}

type SutTypes = {
  sut: LoginController
  validationStub: IValidationComposite
  authenticationStub: IAuthentication
}
const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const authenticationStub = new AuthenticationStub()
  const sut = new LoginController(validationStub, authenticationStub)

  return {
    sut,
    validationStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }

    await sut.handle(httpRequest)

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  test('Should returns 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should returns 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token',
      name: 'any_name'
    }))
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.reject(new Error()))

    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Shoud call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith({
      email: 'any_mail@mail.com',
      password: 'any_password'
    })
  })

  test('Shoud return 400 if Validation returns fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce([
      {
        fieldName: 'any_fieldname',
        message: 'any_message'
      }
    ])

    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(badRequest([
      {
        fieldName: 'any_fieldname',
        message: 'any_message'
      }
    ]))
  })
})
