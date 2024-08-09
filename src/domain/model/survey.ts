export interface ISurveyModel {
  id: string
  question: string
  answers: AnswerSurveyModel[]
  createdAt: Date
}

export interface AnswerSurveyModel {
  image?: string
  answer: string
}
