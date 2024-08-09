import { adapterMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddlewareFactory } from '../factories/middlewares/auth-middleware-factory'

export const auth = adapterMiddleware(makeAuthMiddlewareFactory())
