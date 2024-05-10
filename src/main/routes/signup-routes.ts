import { Router } from 'express'
import { adapterExpress } from '../adapters/express'
import { makeSignUpFactory } from '../factories/signup/signup'

export default (router: Router): void => {
  router.post('/signup', adapterExpress(makeSignUpFactory()))
}
