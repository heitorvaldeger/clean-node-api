import { SurveyResultModel } from '#domain/model/survey-result'

export interface ILoadSurveyResult {
  load: (surveyId: string) => Promise<SurveyResultModel | null>
}
