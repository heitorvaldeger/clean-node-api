import { InvalidParamError } from '../../presentation/errors'
import { IsStringValidation } from './is-string-validation'

describe('IsString Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = new IsStringValidation('any_field')
    const error = sut.validate({
      any_field: false
    })

    expect(error).toEqual(new InvalidParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new IsStringValidation('any_field')
    const isValid = sut.validate({
      any_field: 'any_field'
    })

    expect(isValid).toBeFalsy()
  })

  test('Shoud return an object with call getError method', () => {
    const sut = new IsStringValidation('any_field')

    expect(sut.getError()).toEqual({
      fieldName: 'any_field',
      message: 'any_message'
    })
  })
})
