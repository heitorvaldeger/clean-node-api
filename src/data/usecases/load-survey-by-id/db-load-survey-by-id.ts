import { ILoadSurveyByIdRepository } from '#data/interfaces/db/survey/load-survey-by-id-repository'
import { SurveyModel } from '#domain/model/survey'
import { ILoadSurveyById } from '#domain/usecases/interfaces/load-survey-by-id'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository
  ) {}

  async loadById (surveyId: string): Promise<SurveyModel> {
    return await this.loadSurveyByIdRepository.loadById(surveyId)
  }
}
