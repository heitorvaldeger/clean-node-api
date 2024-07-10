import { IValidation } from '../interfaces/validation'
import { IValidationComposite } from '../interfaces/validation-composite'

export class ValidationComposite implements IValidationComposite {
  constructor (
    private readonly validators: IValidation[]
  ) {}

  validate (input: any): Error[] | null {
    const errors: Error[] = []
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        errors.push(error)
      }
    }

    if (errors.length > 0) {
      return errors
    }

    return null
  }
}
