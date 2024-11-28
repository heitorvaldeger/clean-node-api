import { ILogErrorRepository } from '#data/interfaces/db/log/log-error-repository'
import { ServerError } from '#presentation/errors/index'
import { HttpResponse } from '#presentation/helpers/http/interfaces/http'
import { IController } from '../../interfaces/controller'

export class LogControllerDecorator implements IController {
  constructor (
    private readonly controller: IController,
    private readonly logErrorRepository: ILogErrorRepository
  ) {}

  async handle (request: LogControllerDecorator.Request): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)

    if (httpResponse.statusCode >= 500 && httpResponse.statusCode <= 599) {
      const body = httpResponse.body as ServerError

      await this.logErrorRepository.logError(body.stack ?? '')
    }

    return httpResponse
  }
}

export namespace LogControllerDecorator {
  export type Request = {}
}
