import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Shoud return 400 if no name is provided', () => {
    const signUpController = new SignUpController()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = signUpController.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
