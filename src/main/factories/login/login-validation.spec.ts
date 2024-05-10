import { EmailValidatorAdapter } from '../../../adapters/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../presentation/validators'
import { IValidation } from '../../../presentation/validators/interfaces/validation'
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
