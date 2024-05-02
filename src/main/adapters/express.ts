import { Request, Response } from 'express'
import { IController, IHttpRequest } from '../../presentation/interfaces'

export const adapterExpress = (controller: IController) => {
  return (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      body: req.body
    }

    controller.handle(httpRequest)
      .then(value => {
        res.status(value.statusCode).json(value.body)
      })
      .catch(console.error)
  }
}
