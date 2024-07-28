export interface IValidationError {
  fieldName: string
  message: string
}
export interface IValidation {
  validate: (input: any) => Error | null
  getError: () => IValidationError
}
