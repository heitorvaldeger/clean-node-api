import { SurveyModel } from '#domain/model/survey'

export interface ILoadSurveys {
  load: () => Promise<SurveyModel[]>
}
