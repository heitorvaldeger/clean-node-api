import { IAddSurveyModel } from '#domain/usecases/interfaces/add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
