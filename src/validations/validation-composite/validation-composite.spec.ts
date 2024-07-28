import { MissingParamError } from '../../presentation/errors'
import { IValidation, IValidationError } from '../interfaces/validation'
import { ValidationComposite } from './validation-composite'

class ValidationStub implements IValidation {
  validate (input: any): Error | null {
    return null
  }

  getError (): IValidationError {
    return {
      fieldName: 'any_fieldname',
      message: 'any_message'
    }
  }
}

interface SutTypes {
  sut: ValidationComposite
  validationStubs: IValidation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [new ValidationStub(), new ValidationStub()]
  const sut = new ValidationComposite(validationStubs)

  return {
    validationStubs,
    sut
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    const error = sut.validate({
      any_field: 'any_value'
    })

    expect(error).toEqual([
      new Error()
    ])
  })

  test('Should return the first error if more then one validations fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new Error())

    const error = sut.validate({
      any_field: 'any_value'
    })

    expect(error).toEqual([
      new MissingParamError('field'),
      new Error()
    ])
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()

    const error = sut.validate({
      any_field: 'any_value'
    })

    expect(error).toBeFalsy()
  })
})
