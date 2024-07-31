import { Request, Response } from 'express'
import { IController } from '../../presentation/controllers/interfaces/controller'
import { IHttpRequest } from '../../presentation/helpers/http/interfaces/http'

export const adapterExpress = (controller: IController) => {
  return (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    }

    controller.handle(httpRequest)
      .then(({ statusCode, body }) => {
        if (statusCode >= 200 && statusCode <= 299) {
          res.status(statusCode).json(body)
        } else if (statusCode >= 400 && statusCode <= 499) {
          res.status(statusCode).json({
            errors: body
          })
        } else {
          res.status(statusCode).json({
            error: body.message
          })
        }
      })
      .catch(console.error)
  }
}
