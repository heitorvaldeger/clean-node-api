import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helpers'
import { IController, IEmailValidator, IHttpRequest, IHttpResponse } from '../../interfaces'

export class LoginControler implements IController {
  constructor (private readonly emailValidator: IEmailValidator) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    }

    if (!httpRequest.body.password) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email as string)
    if (!isValid) {
      return await new Promise(resolve => { resolve(badRequest(new InvalidParamError('email'))) })
    }
    return await new Promise(resolve => { resolve(ok(null)) })
  }
}
