export type ValidationError = {
  fieldName: string
  message: string
}
export interface IValidation {
  validate: (input: any) => Error | null
  getError: () => ValidationError
}
