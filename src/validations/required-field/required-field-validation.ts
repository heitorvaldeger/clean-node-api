import { MissingParamError } from '../../presentation/errors'
import { IValidation, ValidationError } from '../interfaces/validation'

export class RequiredFieldValidation implements IValidation {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (input: any): Error | null {
    return !input[this.fieldName] ? new MissingParamError(this.fieldName) : null
  }

  getError (): ValidationError {
    return {
      fieldName: this.fieldName,
      message: 'This field is required. Please enter a value.'
    }
  }
}
