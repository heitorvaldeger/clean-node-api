import { SurveyResultModel } from '#domain/model/survey-result'
import { SaveSurveyResultModel } from '#domain/usecases/interfaces/save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
