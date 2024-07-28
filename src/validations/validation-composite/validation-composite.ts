import { IValidation, IValidationError } from '../interfaces/validation'
import { IValidationComposite } from '../interfaces/validation-composite'

export class ValidationComposite implements IValidationComposite {
  private readonly validatorsWithError: IValidation[] = []

  constructor (
    private readonly validators: IValidation[]
  ) {}

  validate (input: any): Error[] | null {
    const errors: Error[] = []
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        errors.push(error)
        this.validatorsWithError.push(validator)
      }
    }

    if (errors.length > 0) {
      return errors
    }

    return null
  }

  getErrors (): IValidationError[] | [] {
    if (this.validatorsWithError.length > 0) {
      return this.validatorsWithError.map(validator => validator.getError())
    }

    return []
  }
}
