import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adapter'
import { IEmailValidator } from '../../validations/interfaces/email-validator'

const makeEmailValidatorAdapter = (): IEmailValidator => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const emailValidatorAdapter = makeEmailValidatorAdapter()
    const isValid = emailValidatorAdapter.isValid('invalid_email@mail.com')

    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const emailValidatorAdapter = makeEmailValidatorAdapter()
    const isValid = emailValidatorAdapter.isValid('valid_email@mail.com')

    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
    const emailValidatorAdapter = makeEmailValidatorAdapter()
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    emailValidatorAdapter.isValid('any_email@mail.com')

    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
