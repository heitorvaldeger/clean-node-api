import { MissingParamError } from '../../presentation/errors'
import { IValidation, IValidationError } from '../interfaces/validation'

export class RequiredFieldValidation implements IValidation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    return !input[this.fieldName] ? new MissingParamError(this.fieldName) : null
  }

  getError (): IValidationError {
    return {
      fieldName: this.fieldName,
      message: 'any_message'
    }
  }
}
