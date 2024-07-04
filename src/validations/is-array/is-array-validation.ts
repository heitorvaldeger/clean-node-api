import { IValidation } from '../interfaces/validation'
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
}
