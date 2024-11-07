import { AnswerSurveyModel } from '../../model/survey'

export type AddSurveyModel = {
  question: string
  answers: AnswerSurveyModel[]
  createdAt: Date
}

export interface IAddSurvey {
  add: (surveyData: AddSurveyModel) => Promise<void>
}
