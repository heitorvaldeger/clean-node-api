import { IAuthentication, IController, IHttpRequest, IHttpResponse } from './login-interfaces'
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http-helpers'
import { IValidation } from '../signup/signup-interfaces'

export class LoginControler implements IController {
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
      // const requiredFields = ['email', 'password']
      // for (const field of requiredFields) {
      //   if (!httpRequest.body[field]) {
      //     return badRequest(new MissingParamError(field))
      //   }
      // }

      // const isValid = this.emailValidator.isValid(email as string)
      // if (!isValid) {
      //   return badRequest(new InvalidParamError('email'))
      // }

      const accessToken = await this.authentication.auth(email as string, password as string)
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
