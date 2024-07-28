import { IValidationError } from './validation'

export interface IValidationComposite {
  validate: (input: any) => Error[] | null
  getErrors: () => IValidationError[] | []
}
