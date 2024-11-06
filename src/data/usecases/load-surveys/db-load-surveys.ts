import { ILoadSurveys, ILoadSurveysRepository, ISurveyModel } from './db-load-surveys-interfaces'

export class DbLoadSurveys implements ILoadSurveys {
  constructor (
    private readonly loadSurveysRepository: ILoadSurveysRepository
  ) {}

  async load (): Promise<ISurveyModel[]> {
    return await this.loadSurveysRepository.loadAll()
  }
}
