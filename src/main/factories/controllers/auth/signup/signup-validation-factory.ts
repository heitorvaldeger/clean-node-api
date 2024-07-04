import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite, CompareFieldsValidation, IsStringValidation } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'

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
      new EmailValidation('email', new EmailValidatorAdapter())
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

export const makeSignUpValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of fields) {
    validations.push(...field.validations(field.fieldName))
  }

  return new ValidationComposite(validations)
}
