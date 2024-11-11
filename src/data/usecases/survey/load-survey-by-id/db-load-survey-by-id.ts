import { ILoadSurveyByIdRepository, SurveyModel, ILoadSurveyById } from './db-load-survey-by-id-interfaces'

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository
  ) {}

  async loadById (surveyId: number): Promise<SurveyModel | null> {
    const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
    return survey ?? null
  }
}
