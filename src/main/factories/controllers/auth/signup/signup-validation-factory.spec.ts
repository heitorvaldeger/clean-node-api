import { IEmailValidator } from '../../../../../validations/interfaces/email-validator'
import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, IsStringValidation, MinLengthStringValidation } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'
import { makeSignUpValidation } from './signup-validation-factory'

jest.mock('../../../../../validations/validation-composite/validation-composite')

class EmailValidatorStub implements IEmailValidator {
  isValid (email: string): boolean {
    return true
  }
}

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
      new EmailValidation(fieldName, new EmailValidatorStub()),
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
