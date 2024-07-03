import { AuthenticationModel, IAccountModel, IAddAccount, IAddAccountModel, IAuthentication, IValidation } from './signup-controller-interfaces'
import { EmailInUseError, ServerError } from '../../../errors'
import { SignUpController } from './signup-controller'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helpers'

class AuthenticationStub implements IAuthentication {
  async auth (authentication: AuthenticationModel): Promise<string> {
    return await new Promise(resolve => { resolve('any_token') })
  }
}

const makeAddAccountStub = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: IAddAccountModel): Promise<IAccountModel | null> {
      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }

  return new AddAccountStub()
}

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

interface SignUpType {
  sut: SignUpController
  addAccountStub: IAddAccount
  authenticationStub: IAuthentication
  validationStub: IValidation
}

const makeSut = (): SignUpType => {
  const addAccountStub = makeAddAccountStub()
  const validationStub = makeValidationStub()
  const authenticationStub = new AuthenticationStub()
  const sut = new SignUpController(addAccountStub, validationStub, authenticationStub)

  return {
    sut,
    addAccountStub,
    validationStub,
    authenticationStub
  }
}

const fakeRequest = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
}

const fakeAccount: IAccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
}

describe('SignUp Controller', () => {
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

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Shoud call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await sut.handle({
      body: fakeRequest
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Shoud return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Shoud return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token'
    }))
  })

  test('Shoud return 403 if AddAccount returns null', async () => {
    const { sut, addAccountStub } = makeSut()

    jest.spyOn(addAccountStub, 'add').mockReturnValueOnce(new Promise(resolve => {
      resolve(null)
    }))

    const httpResponse = await sut.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Shoud call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await sut.handle({
      body: fakeRequest
    })

    expect(validateSpy).toHaveBeenCalledWith(fakeRequest)
  })

  test('Shoud return 400 if Validation returns fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error()) // pode ser qualquer erro
    const httpResponse = await sut.handle({
      body: fakeRequest
    })

    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
