import { Router } from 'express'
import { adapterExpress } from '../adapters/express'
import { makeLoginFactory } from '../factories/controllers/auth/login/login-factory'
import { makeSignUpFactory } from '../factories/controllers/auth/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', adapterExpress(makeSignUpFactory()))
  router.post('/login', adapterExpress(makeLoginFactory()))
}
