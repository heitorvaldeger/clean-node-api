export interface IValidationComposite {
  validate: (input: any) => Error[] | null
}
