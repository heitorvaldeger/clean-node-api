import { RequiredFieldValidation, ValidationComposite, IsStringValidation, IsArrayValidation } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../../validations/validation-composite/validation-composite')

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

describe('AddSurveyValidator Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()

    const validations: IValidation[] = []
    for (const field of fields) {
      validations.push(...field.validations(field.fieldName))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
