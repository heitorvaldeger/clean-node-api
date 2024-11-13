import { ISaveSurveyResult } from '#domain/usecases/interfaces/survey-result/save-survey-result'
import { InvalidParamError } from '#presentation/errors'
import { HttpRequest, HttpResponse, IController, ok, ILoadSurveyById, serverError, forbidden } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly saveSurveyResult: ISaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { answer } = httpRequest.body
      const { surveyId } = httpRequest.params

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const answers = survey.answers.map(a => a.answer)
      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      await this.saveSurveyResult.save({
        accountId: httpRequest.accountId!,
        surveyId,
        answer,
        date: new Date()
      })
      return ok({})
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
