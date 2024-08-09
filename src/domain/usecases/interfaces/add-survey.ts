export interface IAddSurveyModel {
  question: string
  answers: AnswerSurvey[]
  createdAt: Date
}

interface AnswerSurvey {
  image?: string
  answer: string
}

export interface IAddSurvey {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
