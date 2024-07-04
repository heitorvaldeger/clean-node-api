import { RequiredFieldValidation, ValidationComposite } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

jest.mock('../../../../../validations/validation-composite/validation-composite')

describe('AddSurveyValidator Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()

    const validations: IValidation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
