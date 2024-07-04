import { IsArrayValidation, IsStringValidation, RequiredFieldValidation, ValidationComposite } from '../../../../../validations'
import { IValidation } from '../../../../../validations/interfaces/validation'

export const makeAddSurveyValidation = (): IValidation => {
  const validations: IValidation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
    if (field === 'question') {
      validations.push(new IsStringValidation(field))
    }

    if (field === 'answers') {
      validations.push(new IsArrayValidation(field))
    }
  }

  return new ValidationComposite(validations)
}
