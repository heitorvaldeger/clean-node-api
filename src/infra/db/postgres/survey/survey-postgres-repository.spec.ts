import { AddSurveyParams } from '#domain/usecases/interfaces/survey/add-survey'
import { PostgresHelper } from '../helpers/postgres-helper'
import { SurveyPostgresRepository } from './survey-postgres-repository'

type SutTypes = {
  sut: SurveyPostgresRepository
}
const makeSut = (): SutTypes => {
  const sut = new SurveyPostgresRepository()

  return {
    sut
  }
}

const fakeSurvey: AddSurveyParams = {
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    },
    {
      answer: 'any_answer'
    }
  ],
  createdAt: new Date()
}

describe('SurveyPostgresRepository', () => {
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

  describe('add()', () => {
    test('Should create a survey', async () => {
      const { sut } = makeSut()
      await sut.add(fakeSurvey)

      const surveysCounter = (await PostgresHelper.getTable('surveys').count())[0].count
      const answersCounter = (await PostgresHelper.getTable('answers').count())[0].count
      expect(Number(surveysCounter)).toBe(1)
      expect(Number(answersCounter)).toBe(2)
    })

    test('Should throws a create survey error', async () => {
      jest.spyOn(PostgresHelper, 'getTable').mockImplementationOnce((): any => {
        return ({
          insert () {
            return this
          },
          returning () {
            return []
          }
        })
      })

      const { sut } = makeSut()
      const promise = sut.add(fakeSurvey)

      await expect(promise).rejects.toThrow(new Error('Add survey failure!'))
    })
  })

  describe('loadAll()', () => {
    test('Should loadAll surveys on success', async () => {
      const surveyData = await PostgresHelper.getTable('surveys').insert({
        question: 'any_question',
        createdAt: new Date()
      }, '*')

      await PostgresHelper.getTable('answers').insert({
        answer: 'any_answer',
        survey_id: surveyData[0].id
      }, '*')

      await PostgresHelper.getTable('answers').insert({
        answer: 'other_answer',
        survey_id: surveyData[0].id
      }, '*')

      await PostgresHelper.getTable('surveys').insert({
        question: 'other_question',
        createdAt: new Date()
      }, '*')

      const { sut } = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
      expect(Array.isArray(surveys[0].answers)).toBeTruthy()
    })

    test('Should loadAll empty list', async () => {
      const { sut } = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const surveyData = await PostgresHelper.getTable('surveys').insert({
        question: 'any_question',
        createdAt: new Date()
      }, '*')

      await PostgresHelper.getTable('answers').insert({
        answer: 'any_answer',
        survey_id: surveyData[0].id
      }, '*')

      await PostgresHelper.getTable('answers').insert({
        answer: 'other_answer',
        survey_id: surveyData[0].id
      }, '*')

      const { sut } = makeSut()
      const survey = await sut.loadById(surveyData[0].id)
      expect(survey).toBeTruthy()
      expect(survey?.question).toBe('any_question')
      expect(survey?.answers.length).toBe(2)
      expect(Array.isArray(survey?.answers)).toBeTruthy()
    })
  })
})
