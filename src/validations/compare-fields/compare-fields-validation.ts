import { InvalidParamError } from '../../presentation/errors'
import { IValidation, ValidationError } from '../interfaces/validation'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error | null {
    return input[this.fieldName] !== input[this.fieldToCompareName] ? new InvalidParamError(this.fieldName) : null
  }

  getError (): ValidationError {
    return {
      fieldName: this.fieldName,
      message: `The inputs ${this.fieldName} and ${this.fieldToCompareName} do not match. Please ensure both fields are the same.`
    }
  }
}
