import { InvalidParamError } from '#presentation/errors'
import { HttpRequest, HttpResponse, IController, ok, ILoadSurveyById, serverError, forbidden } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements IController {
  constructor (private readonly loadSurveyById: ILoadSurveyById) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }
      return ok({})
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
