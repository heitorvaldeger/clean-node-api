import request from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '../app'
import { PostgresHelper } from '#infra/db/postgres/helpers/postgres-helper'
import env from '../config/env'

const makeAccessToken = async (): Promise<string> => {
  const insertedRows = await PostgresHelper.getTable('accounts').insert({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  }, '*')

  if (!(insertedRows.length > 0)) {
    throw new Error('Inserted rows failure!')
  }

  const accountId = insertedRows[0].id as string
  const accessToken = sign(accountId, env.jwtSecret)
  await PostgresHelper.getTable('accounts')
    .where('id', insertedRows[0].id)
    .update({
      accessToken
    }, '*')

  return accessToken
}

const makeSurvey = async (): Promise<number> => {
  const insertedRows = await PostgresHelper.getTable('surveys').insert({
    question: 'any_question',
    createdAt: new Date()
  }, '*')
  await PostgresHelper.getTable('answers').insert({
    answer: 'any_answer',
    survey_id: insertedRows[0].id
  })

  return insertedRows[0].id
}

describe('Surveys Routes', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

  // beforeEach(async () => {
  //   await PostgresHelper.truncateAllTables()
  // })

  // afterEach(async () => {
  //   await PostgresHelper.truncateAllTables()
  // })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/:surveyId/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()
      const surveyId = await makeSurvey()

      await request(app)
        .put(`/api/surveys/${surveyId}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })
})
