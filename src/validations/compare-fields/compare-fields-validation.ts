import { InvalidParamError } from '../../presentation/errors'
import { IValidation, IValidationError } from '../interfaces/validation'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error | null {
    return input[this.fieldName] !== input[this.fieldToCompareName] ? new InvalidParamError(this.fieldName) : null
  }

  getError (): IValidationError {
    return {
      fieldName: this.fieldName,
      message: `The inputs ${this.fieldName} and ${this.fieldToCompareName} do not match. Please ensure both fields are the same.`
    }
  }
}
