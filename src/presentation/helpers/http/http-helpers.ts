import { ServerError } from '../../errors/server-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { HttpResponse } from './interfaces/http'

export const badRequest = (errors: any): HttpResponse => ({
  statusCode: 400,
  body: errors
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = <T>(data: T): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (): HttpResponse => ({
  statusCode: 201,
  body: null
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})
