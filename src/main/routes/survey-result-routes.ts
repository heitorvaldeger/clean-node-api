import { Router } from 'express'
import { adapterExpress } from '../adapters/express-route-adapter'
import { auth } from '../middlewares/auth'
import { makeSaveSurveyResultFactory } from '#main/factories/controllers/survey-result/save-survey-result/save-survey-result-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adapterExpress(makeSaveSurveyResultFactory()))
}
