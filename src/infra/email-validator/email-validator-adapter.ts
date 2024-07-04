import validator from 'validator'
import { IEmailValidator } from '../../validations/interfaces/email-validator'

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}
