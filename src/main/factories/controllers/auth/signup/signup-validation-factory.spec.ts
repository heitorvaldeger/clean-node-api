import { IEmailValidator } from '../../../../../validations/interfaces/email-validator'
import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, IsStringValidation } from '../../../../../validations'
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
      new IsStringValidation(fieldName)
    ])
  },
  {
    fieldName: 'email',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName),
      new EmailValidation('email', new EmailValidatorStub())
    ])
  },
  {
    fieldName: 'password',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName)
    ])
  },
  {
    fieldName: 'passwordConfirmation',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName),
      new CompareFieldsValidation('password', fieldName)
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
    console.log(validations)

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
