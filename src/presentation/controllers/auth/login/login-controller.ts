import { IAuthentication, AuthenticationParams, HttpRequest, HttpResponse } from './login-controller-interfaces'
import { badRequest, ok, serverError, unauthorized } from '#presentation/helpers/http/http-helpers'
import { IController } from '../../interfaces/controller'
import { IValidationComposite } from '#validations/interfaces/validation-composite'

export class LoginController implements IController {
  constructor (
    private readonly validation: IValidationComposite,
    private readonly authentication: IAuthentication
  ) {}

  async handle (httpRequest: HttpRequest<AuthenticationParams>): Promise<HttpResponse> {
    try {
      const errors = this.validation.validate(httpRequest.body)
      if (errors) {
        return badRequest(errors)
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
