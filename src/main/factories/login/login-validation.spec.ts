import { EmailValidatorAdapter } from '../../../adapters/email-validator-adapter'
import { EmailValidation } from '../../../presentation/validators/email-validation'
import { IValidation } from '../../../presentation/validators/interfaces/validation'
import { RequiredFieldValidation } from '../../../presentation/validators/required-field-validation'
import { ValidationComposite } from '../../../presentation/validators/validation-composite'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentation/validators/validation-composite')

describe('LoginValidator Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
