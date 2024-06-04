import { Router } from 'express'
import { adapterExpress } from '../../adapters/express/express'
import { makeSignUpFactory } from '../factories/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', adapterExpress(makeSignUpFactory()))
}
