import { Router } from 'express'
import { adapterExpress } from '../adapters/express-route-adapter'
import { makeAddSurveyFactory } from '../factories/controllers/surveys/add-survey/add-survey-factory'

export default (router: Router): void => {
  router.post('/surveys', adapterExpress(makeAddSurveyFactory()))
}
