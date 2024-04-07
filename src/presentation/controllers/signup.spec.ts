import { InvalidParamError, MissingParamError, ServerError } from '../errors'
import { IEmailValidator } from '../interfaces/email-validator'
import { SignUpController } from './signup'

interface SignUpType {
  signUpController: SignUpController
  emailValidatorStub: IEmailValidator
}

const makeSignupController = (): SignUpType => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  return {
    signUpController: new SignUpController(emailValidatorStub),
    emailValidatorStub
  }
}
describe('SignUp Controller', () => {
  test('Shoud return 400 if no name is provided', () => {
    const { signUpController } = makeSignupController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Shoud return 400 if no email is provided', () => {
    const { signUpController } = makeSignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Shoud return 400 if no password is provided', () => {
    const { signUpController } = makeSignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Shoud return 400 if no password confirmation is provided', () => {
    const { signUpController } = makeSignupController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }

    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'))
  })

  test('Shoud return 400 if an invalid email is provided', () => {
    const { signUpController, emailValidatorStub } = makeSignupController()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('Shoud call EmailValidator with correct email', () => {
    const { signUpController, emailValidatorStub } = makeSignupController()
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    signUpController.handle(httpRequest)

    expect(emailValidatorSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Shoud return 500 if EmailValidator throws', () => {
    class EmailValidatorStub implements IEmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const signUpController = new SignUpController(emailValidatorStub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })
})
