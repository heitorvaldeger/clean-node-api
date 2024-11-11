import { SurveyModel } from '#data/usecases/survey/load-surveys/db-load-surveys-interfaces'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<SurveyModel[]>
}
