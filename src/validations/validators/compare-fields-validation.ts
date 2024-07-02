import { InvalidParamError } from '../../presentation/errors'
import { IValidation } from './interfaces/validation'

export class CompareFieldsValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (input: any): Error | null {
    return input[this.fieldName] !== input[this.fieldToCompareName] ? new InvalidParamError(this.fieldName) : null
  }
}
