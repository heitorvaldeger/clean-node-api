import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter'
import { EmailValidation, MinLengthStringValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'
import { IsStringValidation } from '../../../../../validations/is-string/is-string-validation'
import { makeLoginValidation } from './login-validation-factory'

jest.mock('../../../../../validations/validation-composite/validation-composite')

const fields = [
  {
    fieldName: 'email',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName),
      new EmailValidation('email', new EmailValidatorAdapter()),
      new MinLengthStringValidation(fieldName, 10)
    ])
  },
  {
    fieldName: 'password',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName),
      new MinLengthStringValidation(fieldName, 8)
    ])
  }
]

describe('LoginValidator Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()

    const validations: IValidation[] = []
    for (const field of fields) {
      validations.push(...field.validations(field.fieldName))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
