import { badRequest, ok, serverError } from '../../helpers/http/http-helpers'
import { IController } from '../interfaces/controller'
import { IHttpRequest, IHttpResponse, IAddAccount, IValidation } from './signup-controller-interfaces'

export class SignUpController implements IController {
  constructor (
    private readonly addAccount: IAddAccount,
    private readonly validation: IValidation
  ) {

  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { password, email, name } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      account.name = 'Heitor'
      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
