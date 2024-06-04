import { EmailValidatorAdapter } from '../../../adapters/email-validator/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/validators'
import { IValidation } from '../../../presentation/validators/interfaces/validation'

export const makeLoginValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
