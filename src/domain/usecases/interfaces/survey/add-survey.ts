import { SurveyModel } from '#domain/model/survey'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface IAddSurvey {
  add: (surveyData: AddSurveyParams) => Promise<void>
}
