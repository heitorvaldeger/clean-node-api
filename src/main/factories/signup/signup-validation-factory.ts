import { EmailValidatorAdapter } from '../../../adapters/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation } from '../../../presentation/validators'
import { IValidation } from '../../../presentation/validators/interfaces/validation'

export const makeSignUpValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
