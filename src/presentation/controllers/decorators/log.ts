import { ILogErrorRepository } from '../../../data/interfaces/log-error-repository'
import { ServerError } from '../../errors'
import { IController, IHttpRequest, IHttpResponse } from '../../interfaces'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode === 500) {
      const body = httpResponse.body as ServerError

      await this.logErrorRepository.log(body.stack ?? '')
    }
    return httpResponse
  }
}
