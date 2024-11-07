import { EmailValidatorAdapter } from '#infra/email-validator/email-validator-adapter'
import { EmailValidation, MinLengthStringValidation, RequiredFieldValidation, ValidationComposite } from '#validations/index'
import { IValidation } from '#validations/interfaces/validation'
import { IValidationComposite } from '#validations/interfaces/validation-composite'
import { IsStringValidation } from '#validations/is-string/is-string-validation'

const fields = [
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
  }
]

export const makeLoginValidation = (): IValidationComposite => {
  const validations: IValidation[] = []
  for (const field of fields) {
    validations.push(...field.validations(field.fieldName))
  }

  return new ValidationComposite(validations)
}
