import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helpers'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../../interfaces'

export class LoginControler implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { email } = httpRequest.body

    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return await new Promise(resolve => { resolve(badRequest(new MissingParamError(field))) })
      }
    }

    const isValid = this.emailValidator.isValid(email as string)
    if (!isValid) {
      return await new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })
    }
    return await new Promise(resolve => { resolve(ok(null)) })
  }
}
