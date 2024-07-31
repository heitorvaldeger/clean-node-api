import request from 'supertest'
import app from '../app'
import { PostgresHelper } from '../../infra/db/postgres/helpers/postgres-helper'

jest.setTimeout(120000)
describe('Surveys Routes', () => {
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

  describe('POST /surveys', () => {
    test('Should return 403 on add survey success without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [{
            answer: 'any_answer',
            image: 'any_image'
          }]
        })
        .expect(403)
    })
  })
})
