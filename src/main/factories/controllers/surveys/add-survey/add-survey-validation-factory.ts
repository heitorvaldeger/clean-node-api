import { RequiredFieldValidation, ValidationComposite } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'

export const makeAddSurveyValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
