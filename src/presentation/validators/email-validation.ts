import { IEmailValidator } from '../../adapters/interfaces/email-validator'
import { InvalidParamError } from '../errors'
import { IValidation } from './interfaces/validation'

export class EmailValidation implements IValidation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) {}

  validate (input: any): Error | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    return !isValid ? new InvalidParamError(this.fieldName) : null
  }
}
