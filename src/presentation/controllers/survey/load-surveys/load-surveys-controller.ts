import { IController, IHttpRequest, IHttpResponse, ok, ILoadSurveys } from './load-survey-controller-interfaces'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveys.load()
    return ok({})
  }
}
