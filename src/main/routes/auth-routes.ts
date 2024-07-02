import { Router } from 'express'
import { adapterExpress } from '../../adapters/express/express'
import { makeLoginFactory } from '../factories/controllers/login/login-factory'
import { makeSignUpFactory } from '../factories/controllers/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', adapterExpress(makeSignUpFactory()))
  router.post('/login', adapterExpress(makeLoginFactory()))
}
