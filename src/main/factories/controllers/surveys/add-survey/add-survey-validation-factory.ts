import { RequiredFieldValidation, ValidationComposite } from '../../../../../validations/validators'
import { IValidation } from '../../../../../validations/validators/interfaces/validation'

export const makeAddSurveyValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }

  return new ValidationComposite(validations)
}
