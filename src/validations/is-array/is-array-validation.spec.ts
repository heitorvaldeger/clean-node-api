import { InvalidParamError } from '../../presentation/errors'
import { IsArrayValidation } from './is-array-validation'

describe('IsArray Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = new IsArrayValidation('any_field')
    const error = sut.validate({
      any_field: false
    })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should return a InvalidParamError if field is undefined', () => {
    const sut = new IsArrayValidation('any_field')
    const error = sut.validate({})

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new IsArrayValidation('any_field')
    const isValid = sut.validate({
      any_field: []
    })

    expect(isValid).toBeFalsy()
  })

  test('Shoud return an object with call getError method', () => {
    const sut = new IsArrayValidation('any_field')

    expect(sut.getError()).toEqual({
      fieldName: 'any_field',
      message: 'The input must be a non-empty array. Please provide a valid array.'
    })
  })
})
