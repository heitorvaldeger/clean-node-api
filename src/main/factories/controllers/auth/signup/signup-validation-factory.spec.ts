import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, IsStringValidation, MinLengthStringValidation } from '#validations/index'
import { IValidation } from '#validations/interfaces/validation'
import { makeSignUpValidation } from './signup-validation-factory'
import { mockEmailValidatorStub } from '#validations/test'

jest.mock('#validations/validation-composite/validation-composite')

const fields = [
  {
    fieldName: 'name',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName),
      new MinLengthStringValidation(fieldName, 3)
    ])
  },
  {
    fieldName: 'email',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName),
      new EmailValidation(fieldName, mockEmailValidatorStub()),
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
  },
  {
    fieldName: 'passwordConfirmation',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName),
      new CompareFieldsValidation('password', fieldName),
      new MinLengthStringValidation(fieldName, 8)
    ])
  }
]

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite  with all validations', () => {
    makeSignUpValidation()

    const validations: IValidation[] = []
    for (const field of fields) {
      validations.push(...field.validations(field.fieldName))
    }

    // validations.push(new EmailValidation('email', new EmailValidatorStub()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
