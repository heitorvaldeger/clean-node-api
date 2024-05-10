import { IAccountModel, IAddAccount, IAddAccountModel, IValidation } from './signup-interfaces'
import { ServerError } from '../../errors'
import { SignUpController } from './signup'
import { badRequest, ok, serverError } from '../../helpers/http/http-helpers'

const makeAddAccountStub = (): IAddAccount => {
  class AddAccountStub implements IAddAccount {
    async add (account: IAddAccountModel): Promise<IAccountModel> {
      return await new Promise(resolve => { resolve(fakeAccount) })
    }
  }

  return new AddAccountStub()
}

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}

interface SignUpType {
  signUpController: SignUpController
  addAccountStub: IAddAccount
  validationStub: IValidation
}

const makeSignupController = (): SignUpType => {
  const addAccountStub = makeAddAccountStub()
  const validationStub = makeValidationStub()
  const signUpController = new SignUpController(addAccountStub, validationStub)

  return {
    signUpController,
    addAccountStub,
    validationStub
  }
}

const fakeRequest = {
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
  passwordConfirmation: 'any_password'
}

const fakeAccount: IAccountModel = {
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
}

describe('SignUp Controller', () => {
  test('Shoud call AddAccount with correct values', async () => {
    const { signUpController, addAccountStub } = makeSignupController()
    const addSpy = jest.spyOn(addAccountStub, 'add')

    await signUpController.handle({
      body: fakeRequest
    })
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Shoud return 500 if AddAccount throws', async () => {
    const { signUpController, addAccountStub } = makeSignupController()
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await signUpController.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(serverError(new ServerError()))
  })

  test('Shoud return 200 if valid data is provided', async () => {
    const { signUpController } = makeSignupController()

    const httpResponse = await signUpController.handle({
      body: fakeRequest
    })
    expect(httpResponse).toEqual(ok(fakeAccount))
  })

  test('Shoud call Validation with correct value', async () => {
    const { signUpController, validationStub } = makeSignupController()
    const validateSpy = jest.spyOn(validationStub, 'validate')

    await signUpController.handle({
      body: fakeRequest
    })

    expect(validateSpy).toHaveBeenCalledWith(fakeRequest)
  })

  test('Shoud return 400 if Validation returns fails', async () => {
    const { signUpController, validationStub } = makeSignupController()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error()) // pode ser qualquer erro
    const httpResponse = await signUpController.handle({
      body: fakeRequest
    })

    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
