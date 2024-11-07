import { IsArrayValidation, IsStringValidation, MinLengthStringValidation, RequiredFieldValidation, ValidationComposite } from '#validations/index'
import { IValidation } from '#validations/interfaces/validation'
import { IValidationComposite } from '#validations/interfaces/validation-composite'

const fields = [
  {
    fieldName: 'question',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName),
      new MinLengthStringValidation(fieldName, 3)
    ])
  },
  {
    fieldName: 'answers',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsArrayValidation(fieldName)
    ])
  }
]

export const makeAddSurveyValidation = (): IValidationComposite => {
  const validations: IValidation[] = []
  for (const field of fields) {
    validations.push(...field.validations(field.fieldName))
  }

  return new ValidationComposite(validations)
}
