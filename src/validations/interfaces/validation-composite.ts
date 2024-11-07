import { ValidationError } from './validation'

export interface IValidationComposite {
  validate: (input: any) => ValidationError[] | null
}
