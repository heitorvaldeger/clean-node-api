import { AccountModel } from '#domain/model/account'
import { SurveyModel } from '#domain/model/survey'
import moment from 'moment'
import { PostgresHelper } from '../helpers/postgres-helper'
import { SurveyResultPostgresRepository } from './survey-result-postgres-repository'

type SutTypes = {
  sut: SurveyResultPostgresRepository
}
const makeSut = (): SutTypes => {
  const sut = new SurveyResultPostgresRepository()

  return {
    sut
  }
}

const makeFakeAccount = async (): Promise<AccountModel> => {
  const accounts = await PostgresHelper.getTable('accounts')
    .insert({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    }, '*')

  return accounts[0]
}

const makeFakeSurvey = async (): Promise<SurveyModel> => {
  const surveys = await PostgresHelper.getTable('surveys')
    .insert({
      question: 'any_question',
      createdAt: new Date()
    }, '*')

  await PostgresHelper.getTable('answers').insert({
    answer: 'any_answer',
    survey_id: surveys[0].id
  }, '*')

  await PostgresHelper.getTable('answers').insert({
    answer: 'other_answer',
    survey_id: surveys[0].id
  }, '*')

  return surveys[0]
}

describe('SurveyResultPostgresRepository', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

  beforeEach(async () => {
    await PostgresHelper.truncateAllTables()
  })

  afterEach(async () => {
    await PostgresHelper.truncateAllTables()
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const { sut } = makeSut()
      const account = await makeFakeAccount()
      const survey = await makeFakeSurvey()
      const surveyResults = await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: 'any_answer',
        date: new Date()
      })

      expect(surveyResults).toBeTruthy()
      expect(surveyResults?.answers[0].count).toBe(1)
      expect(surveyResults?.answers[0].percent).toBe(100)
      expect(surveyResults?.answers[0].answer).toBe('any_answer')
      expect(surveyResults?.answers[1].count).toBe(0)
      expect(surveyResults?.answers[1].percent).toBe(0)
      expect(surveyResults?.date).toBe(moment(survey.createdAt).format('YYYY-MM-DD h:mm:ss'))
    })

    test('Should update a survey result if its not new', async () => {
      const { sut } = makeSut()
      const account = await makeFakeAccount()
      const survey = await makeFakeSurvey()

      await PostgresHelper.getTable('survey_results')
        .insert({
          account_id: account.id,
          survey_id: survey.id,
          answer: 'any_answer',
          date: new Date()
        }, '*')

      const surveyResults = await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: 'other_answer',
        date: new Date()
      })

      expect(surveyResults).toBeTruthy()
      expect(surveyResults?.answers[0].count).toBe(1)
      expect(surveyResults?.answers[0].percent).toBe(100)
      expect(surveyResults?.answers[0].answer).toBe('other_answer')
      expect(surveyResults?.answers[1].count).toBe(0)
      expect(surveyResults?.answers[1].percent).toBe(0)
    })
  })
})
