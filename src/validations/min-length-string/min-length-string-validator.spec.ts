import { InvalidParamError } from '../../presentation/errors'
import { MinLengthStringValidation } from './min-length-string-validator'

describe('MinLengthString Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = new MinLengthStringValidation('any_field', 5)
    const error = sut.validate({
      any_field: 'any'
    })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should return a InvalidParamError if field is undefined', () => {
    const sut = new MinLengthStringValidation('any_field', 5)
    const error = sut.validate({})

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should return a InvalidParamError if field is not string', () => {
    const sut = new MinLengthStringValidation('any_field', 5)
    const error = sut.validate({
      any_field: 1
    })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new MinLengthStringValidation('any_field', 5)
    const isValid = sut.validate({
      any_field: 'any_field'
    })

    expect(isValid).toBeFalsy()
  })
})
