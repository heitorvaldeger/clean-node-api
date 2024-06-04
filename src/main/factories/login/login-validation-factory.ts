import { IEmailValidator } from '../../../adapters/interfaces/email-validator'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/validators'
import { IValidation } from '../../../presentation/validators/interfaces/validation'

const makeEmailValidatorStub = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

export const makeLoginValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', makeEmailValidatorStub()))

  return new ValidationComposite(validations)
}
