import { IAddAccount } from '../../domain/usecases/interfaces/add-account'
import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers/http-helpers'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../interfaces'

export class SignUpController implements IController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: IAddAccount
  ) {

  }

  handle (httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { password, passwordConfirmation, email, name } = httpRequest.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const emailIsValid = this.emailValidator.isValid(email as string)
      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })

      return {
        statusCode: 200,
        body: 'OK'
      }
    } catch (error) {
      return serverError()
    }
  }
}
