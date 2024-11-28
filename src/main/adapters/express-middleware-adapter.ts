import { NextFunction, Request, Response } from 'express'
import { IMiddleware } from '../../presentation/middlewares/auth-middleware-interfaces'

export const adapterMiddleware = (middleware: IMiddleware) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }

    middleware.handle(request)
      .then(({ statusCode, body }) => {
        if (statusCode >= 200 && statusCode <= 299) {
          Object.assign(req, body)
          next()
        } else {
          res.status(statusCode).json({
            error: body.message
          })
        }
      })
      .catch(console.error)
  }
}
