import { IAuthentication, IController, IEmailValidator, IHttpRequest, IHttpResponse } from './login-interfaces'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'

export class LoginControler implements IController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(email as string)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email as string, password as string)
      if (!accessToken) {
        return unauthorized()
      }
      return ok(null)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
