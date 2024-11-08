import { SurveyModel } from '../../model/survey'

export type AddSurveyModel = Omit<SurveyModel, 'id'>

export interface IAddSurvey {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
