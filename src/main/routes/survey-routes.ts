import { Router } from 'express'
import { adapterExpress } from '../adapters/express-route-adapter'
import { makeAddSurveyFactory } from '../factories/controllers/surveys/add-survey/add-survey-factory'
import { adapterMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddlewareFactory } from '../factories/middlewares/auth-middleware-factory'
import { makeLoadSurveysFactory } from '../factories/controllers/surveys/load-surveys/load-survey-factory'

export default (router: Router): void => {
  const auth = adapterMiddleware(makeAuthMiddlewareFactory())
  router.post('/surveys', adapterMiddleware(makeAuthMiddlewareFactory('admin')), adapterExpress(makeAddSurveyFactory()))
  router.get('/surveys', auth, adapterExpress(makeLoadSurveysFactory()))
}
