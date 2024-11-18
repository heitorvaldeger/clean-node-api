import { SurveyResultModel } from '#domain/model/survey-result'
import { SaveSurveyResultParams } from '#domain/usecases/interfaces/survey-result/save-survey-result'

export interface ISaveSurveyResultRepository {
  save: (data: SaveSurveyResultParams) => Promise<SurveyResultModel | null>
}
