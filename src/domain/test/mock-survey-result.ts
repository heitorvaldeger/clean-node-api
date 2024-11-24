import { SurveyResultModel } from '#domain/model/survey-result'
import { SaveSurveyResultParams } from '#domain/usecases/interfaces/survey-result/save-survey-result'

const createdAt = new Date()

export const mockSaveResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: createdAt
})

export const mockSaveResultModel = (): SurveyResultModel => ({
  surveyId: 'any_survey_id',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 1
  }],
  date: new Date(),
  question: 'any_question'
})
