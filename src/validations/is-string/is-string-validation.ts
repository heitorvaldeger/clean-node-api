import { IValidation } from '../interfaces/validation'
import { InvalidParamError } from '../../presentation/errors'

export class IsStringValidation implements IValidation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    if (typeof input !== 'string') {
      return new InvalidParamError(this.fieldName)
    }

    return null
  }
}
