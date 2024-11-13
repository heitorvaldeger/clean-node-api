import request from 'supertest'
import app from '../app'
import { PostgresHelper } from '#infra/db/postgres/helpers/postgres-helper'

describe('Survey Result Routes', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

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
  })
})
