import { badRequest } from './components/badRequest-component'
import { forbidden } from './components/forbidden-component'
import { notFound } from './components/notFound-component'
import { serverError } from './components/serverError-component'
import { unauthorized } from './components/unauthorized-component'
import { loginPath } from './paths/login-path'
import { signUpPath } from './paths/signup-path'
import { surveyPath } from './paths/survey-path'
import { surveyResultPath } from './paths/survey-result-path'
import { accountSchema } from './schemas/account-schema'
import { addSurveyParamsSchema } from './schemas/add-survey-params-schema'
import { errorSchema } from './schemas/error-schema'
import { loginParamsSchema } from './schemas/login-params-schema'
import { saveSurveyParamsSchema } from './schemas/save-survey-params-schema'
import { signUpParamsSchema } from './schemas/signup-params-schema'
import { surveyAnswerSchema } from './schemas/survey-answer-schema'
import { surveyResultSchema } from './schemas/survey-result-schema'
import { surveySchema } from './schemas/survey-schema'
import { surveysSchema } from './schemas/surveys-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'Clean Node API',
    version: '1.0.0'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Auth'
  }, {
    name: 'Enquetes'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden,
    securitySchemes: {
      apiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-access-token'
      }
    }
  }
}
