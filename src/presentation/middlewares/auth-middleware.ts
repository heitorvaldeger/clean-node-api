import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helpers'
import { IHttpRequest, IHttpResponse } from '../helpers/http/interfaces/http'
import { IMiddleware } from './interfaces/middleware'

export class AuthMiddleware implements IMiddleware {
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = new AccessDeniedError()
    return await new Promise(resolve => {
      resolve(forbidden(error))
    })
  }
}
