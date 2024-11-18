import { AddSurveyParams } from '#domain/usecases/interfaces/survey/add-survey'

export interface IAddSurveyRepository {
  add: (surveyData: AddSurveyParams) => Promise<void>
}
