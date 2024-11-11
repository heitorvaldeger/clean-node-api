import { ILoadSurveys, ILoadSurveysRepository, SurveyModel } from './db-load-surveys-interfaces'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (
    private readonly loadSurveysRepository: ILoadSurveysRepository
  ) {}

  async load (): Promise<SurveyModel[]> {
    return await this.loadSurveysRepository.loadAll()
  }
}
