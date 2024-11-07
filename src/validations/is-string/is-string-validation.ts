import { IValidation, ValidationError } from '../interfaces/validation'
import { InvalidParamError } from '../../presentation/errors'

export class IsStringValidation implements IValidation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    if (typeof input[this.fieldName] !== 'string') {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }

  getError (): ValidationError {
    return {
      fieldName: this.fieldName,
      message: 'The input must be a non-empty string. Please provide a valid input.'
    }
  }
}
