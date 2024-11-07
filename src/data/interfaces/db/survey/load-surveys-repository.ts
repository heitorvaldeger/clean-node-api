import { ISurveyModel } from '#data/usecases/load-surveys/db-load-surveys-interfaces'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<ISurveyModel[]>
}
