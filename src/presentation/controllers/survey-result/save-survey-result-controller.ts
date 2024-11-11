import { HttpRequest, HttpResponse, IController, ok, ILoadSurveyById } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveyById: ILoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId)
    return ok({})
  }
}
