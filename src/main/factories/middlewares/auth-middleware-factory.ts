import { AuthMiddleware } from '#presentation/middlewares/auth-middleware'
import { IMiddleware } from '#presentation/middlewares/auth-middleware-interfaces'
import { makeDbLoadAccountByToken } from '../usecases/account/db-load-account-by-token/db-load-account-by-token'

export const makeAuthMiddlewareFactory = (role?: string): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
