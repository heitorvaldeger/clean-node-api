import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, IsStringValidation, MinLengthStringValidation } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'

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
      new EmailValidation(fieldName, new EmailValidatorAdapter()),
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

export const makeSignUpValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of fields) {
    validations.push(...field.validations(field.fieldName))
  }

  return new ValidationComposite(validations)
}
