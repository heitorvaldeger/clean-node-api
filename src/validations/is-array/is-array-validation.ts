import { IValidation, IValidationError } from '../interfaces/validation'
import { InvalidParamError } from '../../presentation/errors'

export class IsArrayValidation implements IValidation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    if (!Array.isArray(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }

  getError (): IValidationError {
    return {
      fieldName: this.fieldName,
      message: 'The email address is invalid. Please enter a valid email address.'
    }
  }
}
