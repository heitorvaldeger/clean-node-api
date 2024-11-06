import { AnswerSurveyModel } from '../../model/survey'

export interface IAddSurveyModel {
  question: string
  answers: AnswerSurveyModel[]
  createdAt: Date
}

export interface IAddSurvey {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
