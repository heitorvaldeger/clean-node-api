import { Router } from 'express'
import { adapterExpress } from '../../adapters/express/express'
import { makeSignUpFactory } from '../factories/signup/signup-factory'
import { makeLoginFactory } from '../factories/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adapterExpress(makeSignUpFactory()))
  router.post('/login', adapterExpress(makeLoginFactory()))
}
