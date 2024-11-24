export type SurveyResultModel = {
  surveyId: string
  answers: SurveyAnswerResultModel[]
  question: string
  date: Date
}

export type SurveyAnswerResultModel = {
  image?: string
  answer: string
  count: number
  percent: number
}
