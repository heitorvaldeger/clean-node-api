import { SurveyResultModel } from '#domain/model/survey-result'

export type SaveSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface ISaveSurveyResult {
  save: (surveyData: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
