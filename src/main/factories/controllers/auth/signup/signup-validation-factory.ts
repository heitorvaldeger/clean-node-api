import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, IsStringValidation } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'

export const makeSignUpValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
    validations.push(new IsStringValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
