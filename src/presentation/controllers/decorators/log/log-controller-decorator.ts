import { ILogErrorRepository } from '#data/interfaces/db/log/log-error-repository'
import { ServerError } from '#presentation/errors/index'
import { HttpRequest, HttpResponse } from '#presentation/helpers/http/interfaces/http'
import { IController } from '../../interfaces/controller'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    if (httpResponse.statusCode >= 500 && httpResponse.statusCode <= 599) {
      const body = httpResponse.body as ServerError

      await this.logErrorRepository.logError(body.stack ?? '')
    }

    return httpResponse
  }
}
