import { MissingParamError } from '../../errors'
import { badRequest, ok } from '../../helpers/http-helpers'
import { IController, IHttpRequest, IHttpResponse } from '../../interfaces'

export class LoginControler implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
    }

    if (!httpRequest.body.password) {
      return await new Promise(resolve => { resolve(badRequest(new MissingParamError('password'))) })
    }

    return await new Promise(resolve => { resolve(ok(null)) })
  }
}
