import { SurveyResultModel } from '#domain/model/survey-result'

export type SaveSurveyResultParams = {
  accountId: string
  surveyId: string
  answer: string
  date: Date
}

export interface ISaveSurveyResult {
  save: (surveyData: SaveSurveyResultParams) => Promise<SurveyResultModel | null>
}
