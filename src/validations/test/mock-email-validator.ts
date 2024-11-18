import { EmailValidatorAdapter } from '#infra/email-validator/email-validator-adapter'
import { IEmailValidator } from '#validations/interfaces/email-validator'

export const mockEmailValidatorAdapter = (): IEmailValidator => {
  return new EmailValidatorAdapter()
}

export const mockEmailValidatorStub = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
