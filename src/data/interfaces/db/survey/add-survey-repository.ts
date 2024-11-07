import { AddSurveyModel } from '#domain/usecases/interfaces/add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
