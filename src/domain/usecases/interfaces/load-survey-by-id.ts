import { SurveyModel } from '#domain/model/survey'

export interface ILoadSurveyById {
  loadById: (surveyId: string) => Promise<SurveyModel | null>
}
