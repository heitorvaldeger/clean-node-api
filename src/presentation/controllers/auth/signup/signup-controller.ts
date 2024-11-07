import { IValidationComposite } from '#validations/interfaces/validation-composite'
import { EmailInUseError } from '#presentation/errors/index'
import { badRequest, forbidden, ok, serverError } from '#presentation/helpers/http/http-helpers'
import { IController } from '../../interfaces/controller'
import { IHttpRequest, IHttpResponse, IAddAccount, IAuthentication, IAddAccountModel } from './signup-controller-interfaces'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidationComposite,
    private readonly authentication: IAuthentication
  ) {

  }

  async handle (httpRequest: IHttpRequest<IAddAccountModel>): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { password, email, name } = httpRequest.body!

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return ok({
        accessToken
      })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
