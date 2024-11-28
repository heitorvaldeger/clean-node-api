import { IAuthentication, HttpResponse } from './login-controller-interfaces'
import { badRequest, ok, serverError, unauthorized } from '#presentation/helpers/http/http-helpers'
import { IController } from '../../interfaces/controller'
import { IValidationComposite } from '#validations/interfaces/validation-composite'

export class LoginController implements IController {
  constructor (
    private readonly validation: IValidationComposite,
    private readonly authentication: IAuthentication
  ) {}

  async handle (request: LoginController.Request): Promise<HttpResponse> {
    try {
      const errors = this.validation.validate(request)
      if (errors) {
        return badRequest(errors)
      }

      const { email, password } = request

      const auth = await this.authentication.auth({
        email,
        password
      })
      if (!auth) {
        return unauthorized()
      }
      return ok(auth)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
