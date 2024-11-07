import { IValidation, ValidationError } from '../interfaces/validation'
import { InvalidParamError } from '../../presentation/errors'

export class MinLengthStringValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly stringLength: number
  ) {}

  validate (input: any): Error | null {
    if (!input[this.fieldName] ||
      (typeof input[this.fieldName] !== 'string') ||
      (input[this.fieldName].length < this.stringLength)) {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }

  getError (): ValidationError {
    return {
      fieldName: this.fieldName,
      message: `The input meets the minimum length requirement of ${this.stringLength} characters.`
    }
  }
}
