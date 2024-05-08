import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers/http-helpers'
import { IController, IHttpRequest, IHttpResponse } from '../../interfaces'

export class LoginControler implements IController {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await new Promise(resolve => { resolve(badRequest(new MissingParamError('email'))) })
  }
}
