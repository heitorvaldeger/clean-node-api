import { IEmailValidator } from '../presentation/interfaces'

export class EmailValidatorAdapter implements IEmailValidator {
  public isValid (email: string): boolean {
    return false
  }
}
