import { IsArrayValidation, IsStringValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'

const fields = [
  {
    fieldName: 'question',
    validations: (fieldName: string) => ([
      new RequiredFieldValidation(fieldName),
      new IsStringValidation(fieldName)
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

export const makeAddSurveyValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of fields) {
    validations.push(...field.validations(field.fieldName))
  }

  return new ValidationComposite(validations)
}
