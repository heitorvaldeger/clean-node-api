import { Router } from 'express'
import { adapterExpress } from '../adapters/express-route-adapter'
import { makeAddSurveyFactory } from '../factories/controllers/surveys/add-survey/add-survey-factory'
import { adapterMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddlewareFactory } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  router.post('/surveys', adapterMiddleware(makeAuthMiddlewareFactory('admin')), adapterExpress(makeAddSurveyFactory()))
}
