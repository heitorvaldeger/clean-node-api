import { ISurveyModel } from '../../../usecases/load-surveys/db-load-surveys-interfaces'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<ISurveyModel[]>
}
