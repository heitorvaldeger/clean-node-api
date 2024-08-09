import { IAddSurveyModel } from '../../../../domain/usecases/interfaces/add-survey'
import { PostgresHelper } from '../helpers/postgres-helper'
import { SurveyPostgresRepository } from './survey-postgres-repository'

interface SutTypes {
  sut: SurveyPostgresRepository
}
const makeSut = (): SutTypes => {
  const sut = new SurveyPostgresRepository()

  return {
    sut
  }
}

const fakeSurvey: IAddSurveyModel = {
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
    await PostgresHelper.getTable('answers').whereNotNull('id').del()
    await PostgresHelper.getTable('surveys').whereNotNull('id').del()
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
      await PostgresHelper.getTable('surveys').insert({
        question: 'any_question',
        createdAt: new Date()
      })

      await PostgresHelper.getTable('surveys').insert({
        question: 'other_question',
        createdAt: new Date()
      })

      const { sut } = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })
  })
})
