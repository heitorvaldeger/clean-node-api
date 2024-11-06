import { Router } from 'express'
import { adapterExpress } from '../adapters/express-route-adapter'
import { makeAddSurveyFactory } from '../factories/controllers/surveys/add-survey/add-survey-factory'
import { makeLoadSurveysFactory } from '../factories/controllers/surveys/load-surveys/load-survey-factory'
import { adminAuth } from '../middlewares/admin-auth'
import { auth } from '../middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adapterExpress(makeAddSurveyFactory()))
  router.get('/surveys', auth, adapterExpress(makeLoadSurveysFactory()))
}
