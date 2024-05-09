import { badRequest, ok, serverError } from '../../helpers/http-helpers'
import { IController, IHttpRequest, IHttpResponse, IAddAccount, IValidation } from './signup-interfaces'

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

      // const emailIsValid = this.emailValidator.isValid(email as string)
      // if (!emailIsValid) {
      //   return badRequest(new InvalidParamError('email'))
      // }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
