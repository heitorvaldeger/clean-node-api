import request from 'supertest'
import app from '../app'

describe('SignUp Routes', () => {
  test('Should return an account on success ', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@mail',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      })
      .expect(200)
  })
})
