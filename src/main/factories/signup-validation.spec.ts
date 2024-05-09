import { CompareFieldsValidation } from '../../presentation/validators/compare-fields-validation'
import { IValidation } from '../../presentation/validators/interfaces/validation'
import { RequiredFieldValidation } from '../../presentation/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../presentation/validators/validation-composite')
describe('SignUpValidation Factory', () => {
  test('should ', () => {
    makeSignUpValidation()

    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
