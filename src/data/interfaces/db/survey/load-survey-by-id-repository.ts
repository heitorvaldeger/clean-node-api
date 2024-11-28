import { SurveyModel } from '#data/usecases/survey/load-surveys/db-load-surveys-interfaces'

export interface ILoadSurveyByIdRepository {
  loadById: (surveyId: string) => Promise<SurveyModel | null>
}
