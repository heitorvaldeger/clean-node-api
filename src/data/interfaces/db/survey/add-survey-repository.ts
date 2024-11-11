import { AddSurveyModel } from '#domain/usecases/interfaces/survey/add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
