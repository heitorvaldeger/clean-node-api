import { IAuthentication, IHttpRequest, IHttpResponse } from './login-controller-interfaces'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http/http-helpers'
import { IValidation } from '../signup/signup-controller-interfaces'
import { IController } from '../interfaces/controller'

export class LoginController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { email, password } = httpRequest.body

      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })
      if (!accessToken) {
        return unauthorized()
      }
      return ok({
        accessToken
      })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
