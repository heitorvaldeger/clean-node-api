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

  test('Should not return if validation succeeds', () => {
    const sut = new IsArrayValidation('any_field')
    const isValid = sut.validate({
      any_field: []
    })

    expect(isValid).toBeFalsy()
  })
})
