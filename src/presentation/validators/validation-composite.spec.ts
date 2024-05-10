import { IValidation } from './interfaces/validation'
import { ValidationComposite } from './validation-composite'

class ValidationStub implements IValidation {
  validate (input: any): Error | null {
    return new Error()
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({
      any_field: 'any_value'
    })

    expect(error).toEqual(new Error())
  })
})
