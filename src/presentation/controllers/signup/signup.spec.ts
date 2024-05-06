import { IAccountModel, IAddAccount, IAddAccountModel, IEmailValidator } from './signup-interfaces'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { SignUpController } from './signup'
import { badRequest, ok, serverError } from '../../helpers/http-helpers'

const makeEmailValidatorStub = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeAddAccountStub = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: IAddAccountModel): Promise<IAccountModel> {
      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }

  return new AddAccountStub()
}

interface SignUpType {
  signUpController: SignUpController
  emailValidatorStub: IEmailValidator
  addAccountStub: IAddAccount
}

const makeSignupController = (): SignUpType => {
  const emailValidatorStub = makeEmailValidatorStub()
  const addAccountStub = makeAddAccountStub()
  const signUpController = new SignUpController(emailValidatorStub, addAccountStub)

  return {
    signUpController,
    emailValidatorStub,
    addAccountStub
  }
}

const fakeRequest = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
}

const fakeAccount = {
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
}

describe('SignUp Controller', () => {
  test('Shoud return 400 if no name is provided', async () => {
    const { signUpController } = makeSignupController()
    const { name, ...restParams } = fakeRequest

    const httpResponse = await signUpController.handle({
      body: {
        ...restParams
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Shoud return 400 if no email is provided', async () => {
    const { signUpController } = makeSignupController()
    const { email, ...restParams } = fakeRequest

    const httpResponse = await signUpController.handle({
      body: {
        ...restParams
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Shoud return 400 if no password is provided', async () => {
    const { signUpController } = makeSignupController()
    const { password, ...restParams } = fakeRequest

    const httpResponse = await signUpController.handle({
      body: {
        ...restParams
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  test('Shoud return 400 if no password confirmation is provided', async () => {
    const { signUpController } = makeSignupController()
    const { passwordConfirmation, ...restParams } = fakeRequest

    const httpResponse = await signUpController.handle({
      body: {
        ...restParams
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  test('Shoud return 400 if password confirmation fails', async () => {
    const { signUpController } = makeSignupController()

    const httpResponse = await signUpController.handle({
      body: {
        ...fakeRequest,
        passwordConfirmation: 'invalid_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
  })

  test('Shoud return 400 if an invalid email is provided', async () => {
    const { signUpController, emailValidatorStub } = makeSignupController()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await signUpController.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  test('Shoud call EmailValidator with correct email', async () => {
    const { signUpController, emailValidatorStub } = makeSignupController()
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')

    await signUpController.handle({
      body: fakeRequest
    })

    expect(emailValidatorSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Shoud return 500 if EmailValidator throws', async () => {
    const { signUpController, emailValidatorStub } = makeSignupController()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await signUpController.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Shoud call AddAccount with correct values', async () => {
    const { signUpController, addAccountStub } = makeSignupController()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await signUpController.handle({
      body: fakeRequest
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Shoud return 500 if AddAccount throws', async () => {
    const { signUpController, addAccountStub } = makeSignupController()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await signUpController.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Shoud return 200 if valid data is provided', async () => {
    const { signUpController } = makeSignupController()

    const httpResponse = await signUpController.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(ok(fakeAccount))
  })
})
