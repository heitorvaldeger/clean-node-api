import { IValidationError } from './validation'

export interface IValidationComposite {
  validate: (input: any) => IValidationError[] | null
}
