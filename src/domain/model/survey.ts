export type SurveyModel = {
  id: string
  question: string
  answers: AnswerSurveyModel[]
  createdAt: Date
}

export type AnswerSurveyModel = {
  image?: string
  answer: string
}
