import { SurveyResultModel } from '#domain/model/survey-result'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>

export interface ISaveSurveyResult {
  save: (surveyData: SaveSurveyResultParams) => Promise<SurveyResultModel | null>
}
