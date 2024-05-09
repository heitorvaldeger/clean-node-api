import { CompareFieldsValidation } from '../../presentation/validators/compare-fields-validation'
import { IValidation } from '../../presentation/validators/interfaces/validation'
import { RequiredFieldValidation } from '../../presentation/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/validators/validation-composite'

export const makeSignUpValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))

  return new ValidationComposite(validations)
}
