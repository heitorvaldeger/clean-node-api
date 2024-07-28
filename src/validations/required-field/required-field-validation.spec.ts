import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldValidation } from './required-field-validation'

describe('RequiredField Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('any_field')
    const error = sut.validate({ other_field: 'other_field' })

    expect(error).toEqual(new MissingParamError('any_field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = new RequiredFieldValidation('any_field')
    const isValid = sut.validate({ any_field: 'any_field' })

    expect(isValid).toBeFalsy()
  })

  test('Shoud return an object with call getError method', () => {
    const sut = new RequiredFieldValidation('any_field')

    expect(sut.getError()).toEqual({
      fieldName: 'any_field',
      message: 'any_message'
    })
  })
})
