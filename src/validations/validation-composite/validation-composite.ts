import { IValidation, ValidationError } from '../interfaces/validation'
import { IValidationComposite } from '../interfaces/validation-composite'

export class ValidationComposite implements IValidationComposite {
  constructor (
    private readonly validators: IValidation[]
  ) {}

  validate (input: any): ValidationError[] | null {
    const errors: ValidationError[] = []
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        const fullError = validator.getError()
        errors.push(fullError)
      }
    }

    if (errors.length > 0) {
      return errors
    }

    return null
  }
}
