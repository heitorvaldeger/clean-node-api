import { SurveyResultModel } from '#domain/model/survey-result'
import { SaveSurveyResultModel } from '#domain/usecases/interfaces/survey-result/save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (data: SaveSurveyResultModel) => Promise<SurveyResultModel | null>
}
