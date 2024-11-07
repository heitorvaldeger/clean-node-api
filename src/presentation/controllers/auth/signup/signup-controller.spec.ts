import { AuthenticationModel, AccountModel, IAddAccount, AddAccountModel, IAuthentication, ValidationError } from './signup-controller-interfaces'
import { EmailInUseError, ServerError } from '#presentation/errors/index'
import { SignUpController } from './signup-controller'
import { badRequest, forbidden, ok, serverError } from '#presentation/helpers/http/http-helpers'
import { IValidationComposite } from '#validations/interfaces/validation-composite'

class AuthenticationStub implements IAuthentication {
  async auth (authentication: AuthenticationModel): Promise<string> {
    return await new Promise(resolve => { resolve('any_token') })
  }
}

const makeAddAccountStub = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: AddAccountModel): Promise<AccountModel | null> {
      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }

  return new AddAccountStub()
}

const makeValidationStub = (): IValidationComposite => {
  class ValidationStub implements IValidationComposite {
    validate (input: any): ValidationError[] | null {
      return null
    }
  }

  return new ValidationStub()
}

type SutTypes = {
  sut: SignUpController
  addAccountStub: IAddAccount
  authenticationStub: IAuthentication
  validationStub: IValidationComposite
}

const makeSut = (): SutTypes => {
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

const fakeAccount: AccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
}

describe('SignUp Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')

    await sut.handle({
      body: fakeRequest
    })

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const httpResponse = await sut.handle({
      body: fakeRequest
    })

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
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce([
      {
        fieldName: 'any_fieldname',
        message: 'any_message'
      }
    ]) // pode ser qualquer erro
    const httpResponse = await sut.handle({
      body: fakeRequest
    })

    expect(httpResponse).toEqual(badRequest([
      {
        fieldName: 'any_fieldname',
        message: 'any_message'
      }
    ]))
  })
})
