import { IEmailValidator } from '../../../presentation/interfaces/email-validator'
import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation } from '../../../presentation/validators'
import { IValidation } from '../../../presentation/validators/interfaces/validation'
import { makeSignUpValidation } from './signup-validation'

jest.mock('../../../presentation/validators/validation-composite')

const makeEmailValidatorStub = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite  with all validations', () => {
    makeSignUpValidation()

    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }

    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidatorStub()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
