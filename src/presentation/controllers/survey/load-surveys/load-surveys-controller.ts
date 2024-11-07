import { IController, HttpRequest, HttpResponse, ok, ILoadSurveys, serverError, noContent } from './load-survey-controller-interfaces'

export class LoadSurveysController implements IController {
  constructor (
    private readonly loadSurveys: ILoadSurveys
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      if (surveys.length > 0) {
        return ok(surveys)
      }

      return noContent()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
