import request from 'supertest'
import { sign } from 'jsonwebtoken'
import app from '../app'
import { PostgresHelper } from '../../infra/db/postgres/helpers/postgres-helper'
import env from '../config/env'

describe('Surveys Routes', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

  beforeEach(async () => {
    await PostgresHelper.getTable('answers').whereNotNull('id').del()
    await PostgresHelper.getTable('surveys').whereNotNull('id').del()
    await PostgresHelper.getTable('accounts').whereNotNull('id').del()
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        .where('id', insertedRows[0].id)
        .update({
          accessToken
        }, '*')

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
})
