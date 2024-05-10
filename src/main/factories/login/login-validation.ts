import { IEmailValidator } from '../../../presentation/interfaces'
import { EmailValidation } from '../../../presentation/validators/email-validation'
import { IValidation } from '../../../presentation/validators/interfaces/validation'
import { RequiredFieldValidation } from '../../../presentation/validators/required-field-validation'
import { ValidationComposite } from '../../../presentation/validators/validation-composite'

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
