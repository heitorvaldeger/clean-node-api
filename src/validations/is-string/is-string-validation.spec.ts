import { InvalidParamError } from '../../presentation/errors'
import { IsStringValidation } from './is-string-validation'

describe('IsString Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = new IsStringValidation('any_field')
    const error = sut.validate(1)

    expect(error).toEqual(new InvalidParamError('any_field'))
  })
})
