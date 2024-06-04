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
        if (statusCode === 200) {
          res.status(statusCode).json(body)
        } else {
          res.status(statusCode).json({
            error: body.message
          })
        }
      })
      .catch(console.error)
  }
}
