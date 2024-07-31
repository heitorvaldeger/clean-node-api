import { ILoadAccountByToken } from '../../domain/usecases/interfaces/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbidden, ok } from '../helpers/http/http-helpers'
import { IHttpRequest, IHttpResponse } from '../helpers/http/interfaces/http'
import { IMiddleware } from './interfaces/middleware'

export class AuthMiddleware implements IMiddleware {
  constructor (
    private readonly loadAccountByToken: ILoadAccountByToken
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'] as string

    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return ok({
          accountId: account.id
        })
      }
    }

    return forbidden(new AccessDeniedError())
  }
}
