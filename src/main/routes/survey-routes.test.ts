import request from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '../app'
import { PostgresHelper } from '#infra/db/postgres/helpers/postgres-helper'
import env from '../config/env'

const makeAccessToken = async (): Promise<string> => {
  const insertedRows = await PostgresHelper.getTable('accounts').insert({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    role: 'admin'
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

describe('Surveys Routes', () => {
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

    test('Should return 201 on add survey success with accessToken', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [{
            answer: 'any_answer',
            image: 'any_image'
          }]
        })
        .expect(201)
    })
  })

  describe('GET /surveys', () => {
    test('Should return 403 on load surveys success without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .send()
        .expect(403)
    })

    test('Should return 204 on load surveys success with accessToken', async () => {
      const accessToken = await makeAccessToken()

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send()
        .expect(204)
    })

    test('Should return 200 on load surveys success with accessToken', async () => {
      const accessToken = await makeAccessToken()

      await PostgresHelper.getTable('surveys').insert({
        question: 'any_question',
        createdAt: new Date()
      })

      await PostgresHelper.getTable('surveys').insert({
        question: 'other_question',
        createdAt: new Date()
      })

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .send().expect(200)
    })
  })
})
