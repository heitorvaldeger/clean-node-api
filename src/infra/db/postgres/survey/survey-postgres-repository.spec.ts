import { PostgresHelper } from '../helpers/postgres-helper'
import { SurveyPostgresRepository } from './survey-postgres-repository'

describe('SurveyPostgresRepository', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

  beforeEach(async () => {
    await PostgresHelper.getTable('answers').whereNotNull('id').del()
    await PostgresHelper.getTable('surveys').whereNotNull('id').del()
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  test('Should create a survey', async () => {
    const sut = new SurveyPostgresRepository()
    await sut.add({
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        },
        {
          answer: 'any_answer'
        }
      ]
    })

    const surveysCounter = (await PostgresHelper.getTable('surveys').count())[0].count
    const answersCounter = (await PostgresHelper.getTable('answers').count())[0].count
    expect(Number(surveysCounter)).toBe(1)
    expect(Number(answersCounter)).toBe(2)
  })
})
