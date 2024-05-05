import { IController, IHttpRequest, IHttpResponse } from '../../interfaces'

export class LogControllerDecorator implements IController {
  constructor (private readonly controller: IController) {}
  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await this.controller.handle(httpRequest)
  }
}
