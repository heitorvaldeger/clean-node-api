import { ISaveSurveyResult } from '#domain/usecases/interfaces/survey-result/save-survey-result'
import { InvalidParamError } from '#presentation/errors/index'
import { HttpResponse, IController, ok, ILoadSurveyById, serverError, forbidden } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements IController {
  constructor (
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly saveSurveyResult: ISaveSurveyResult
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    try {
      const { answer, surveyId, accountId } = request

      const survey = await this.loadSurveyById.loadById(surveyId)
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const answers = survey.answers.map(a => a.answer)
      if (!answers.includes(answer)) {
        return forbidden(new InvalidParamError('answer'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })

      return ok(surveyResult)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

export namespace SaveSurveyResultController {
  // eslint-disable-next-line @typescript-eslint/ban-types
  export type Request = {
    answer: string
    surveyId: string
    accountId: string
  }
}
