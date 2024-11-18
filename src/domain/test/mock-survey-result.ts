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
  ...mockSaveResultParams(),
  id: 'any_id'
})
