import { AccountModel } from '#domain/model/account'
import { SurveyModel } from '#domain/model/survey'
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
      const surveyResult = await sut.save({
        accountId: account.id,
        surveyId: survey.id,
        answer: 'any_answer',
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult?.id).toBeTruthy()
      expect(surveyResult?.answer).toBe('any_answer')
    })
  })
})
