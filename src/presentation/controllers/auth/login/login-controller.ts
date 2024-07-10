import { IAuthentication, IAuthenticationModel, IHttpRequest, IHttpResponse } from './login-controller-interfaces'
import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helpers'
import { IController } from '../../interfaces/controller'
import { IValidationComposite } from '../../../../validations/interfaces/validation-composite'

export class LoginController implements IController {
  constructor (
    private readonly validation: IValidationComposite,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: IHttpRequest<IAuthenticationModel>): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = httpRequest.body!

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
