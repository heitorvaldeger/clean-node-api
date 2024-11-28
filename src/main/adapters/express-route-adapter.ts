import { Request, Response } from 'express'
import { IController } from '../../presentation/controllers/interfaces/controller'

export const adapterExpress = (controller: IController) => {
  return (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      accountId: req.accountId
    }

    controller.handle(request)
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
