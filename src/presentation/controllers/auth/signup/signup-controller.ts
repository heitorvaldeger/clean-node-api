import { IValidationComposite } from '#validations/interfaces/validation-composite'
import { EmailInUseError } from '#presentation/errors/index'
import { badRequest, forbidden, ok, serverError } from '#presentation/helpers/http/http-helpers'
import { IController } from '../../interfaces/controller'
import { HttpResponse, IAddAccount, IAuthentication } from './signup-controller-interfaces'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidationComposite,
    private readonly authentication: IAuthentication
  ) {

  }

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { password, email, name } = request

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const auth = await this.authentication.auth({
        email,
        password
      })
      return ok(auth)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
