import { SurveyModel } from '#data/usecases/load-surveys/db-load-surveys-interfaces'

export interface ILoadSurveyByIdRepository {
  loadById: (surveyId: string) => Promise<SurveyModel>
}
