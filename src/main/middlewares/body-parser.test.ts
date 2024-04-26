import request from 'supertest'
import app from '../app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json ', async () => {
    app.post('/body_parser_test', (req, res) => {
      return res.json(req.body)
    })
    await request(app).post('/body_parser_test')
      .send({
        name: 'valid_name'
      })
      .expect({
        name: 'valid_name'
      })
  })
})
