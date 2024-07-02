import { IValidation } from './interfaces/validation'

export class ValidationComposite implements IValidation {
  constructor (
    private readonly validators: IValidation[]
  ) {}

  validate (input: any): Error | null {
    for (const validator of this.validators) {
      const error = validator.validate(input)
      if (error) {
        return error
      }
    }

    return null
  }
}
