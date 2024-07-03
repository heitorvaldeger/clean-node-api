import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validations/validators'
import { IValidation } from '../../../../../validations/validators/interfaces/validation'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../../validations/validators/validation-composite')

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
