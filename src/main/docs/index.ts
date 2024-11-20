import { badRequest } from './components/badRequest-component'
import { notFound } from './components/notFound-component'
import { serverError } from './components/serverError-component'
import { unauthorized } from './components/unauthorized-component'
import { loginPath } from './paths/login-path'
import { accountSchema } from './schemas/account-schema'
import { errorSchema } from './schemas/error-schema'
import { loginParamsSchema } from './schemas/login-params-schema'

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
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
