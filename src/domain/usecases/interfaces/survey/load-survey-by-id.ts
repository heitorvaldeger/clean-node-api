import { SurveyModel } from '#domain/model/survey'

export interface ILoadSurveyById {
  loadById: (surveyId: number) => Promise<SurveyModel | null>
}
