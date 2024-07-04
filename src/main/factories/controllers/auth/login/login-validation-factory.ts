import { EmailValidatorAdapter } from '../../../../../infra/email-validator/email-validator-adapter'
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'
import { IsStringValidation } from '../../../../../validations/is-string/is-string-validation'

const fields = [
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
  }
]

export const makeLoginValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of fields) {
    validations.push(...field.validations(field.fieldName))
  }

  return new ValidationComposite(validations)
}
