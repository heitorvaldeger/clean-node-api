import { InvalidParamError } from '../../presentation/errors'
import { IEmailValidator } from '../../validations/interfaces/email-validator'
import { EmailValidation } from './email-validation'
import { IValidation } from '../interfaces/validation'
import { mockEmailValidatorStub } from '#validations/test'

type SutTypes = {
  sut: IValidation
  emailValidator: IEmailValidator
}
const makeSut = (): SutTypes => {
  const emailValidator = mockEmailValidatorStub()
  const sut = new EmailValidation('email', emailValidator)

  return {
    sut,
    emailValidator
  }
}

describe('Email Validation', () => {
  test('Shoud call EmailValidator with correct email', () => {
    const { sut, emailValidator } = makeSut()
    const isValid = jest.spyOn(emailValidator, 'isValid')

    sut.validate({
      email: 'any_email@mail.com'
    })

    expect(isValid).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Shoud return throw if EmailValidator throws', () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    expect(sut.validate).toThrow()
  })

  test('Shoud return an error if EmailValidator returns false', () => {
    const { sut, emailValidator } = makeSut()
    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({
      email: 'any_mail@mail.com'
    })

    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Shoud return an object with call getError method', () => {
    const { sut } = makeSut()

    expect(sut.getError()).toEqual({
      fieldName: 'email',
      message: 'The email address is invalid. Please enter a valid email address.'
    })
  })
})
