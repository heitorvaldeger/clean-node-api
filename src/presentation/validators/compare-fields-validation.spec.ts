import { InvalidParamError } from '../errors'
import { CompareFieldsValidation } from './compare-fields-validation'

describe('CompareFields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const error = sut.validate({ field: 'any_value', fieldToCompare: 'wrong_value' })

    expect(error).toEqual(new InvalidParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new CompareFieldsValidation('field', 'fieldToCompare')
    const isValid = sut.validate({ field: 'any_value', fieldToCompare: 'any_value' })

    expect(isValid).toBeFalsy()
  })
})