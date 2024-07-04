import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'

export const makeLoginValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

  return new ValidationComposite(validations)
}
