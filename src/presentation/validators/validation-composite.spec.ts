import { IValidation } from './interfaces/validation'
import { ValidationComposite } from './validation-composite'

class ValidationStub implements IValidation {
  validate (input: any): Error | null {
    return null
  }
}

interface SutTypes {
  sut: ValidationComposite
  validationStub: IValidation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new ValidationComposite([validationStub])

  return {
    validationStub,
    sut
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({
      any_field: 'any_value'
    })

    expect(error).toEqual(new Error())
  })
})
