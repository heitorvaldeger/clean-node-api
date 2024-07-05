import { IValidation } from '../interfaces/validation'
import { InvalidParamError } from '../../presentation/errors'

export class MinLengthStringValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly stringLength: number
  ) {}

  validate (input: any): Error | null {
    if (!input[this.fieldName] || (input[this.fieldName].length < this.stringLength)) {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }
}
