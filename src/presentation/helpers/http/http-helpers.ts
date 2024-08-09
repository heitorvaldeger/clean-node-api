import { ServerError } from '../../errors/server-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { IHttpResponse } from './interfaces/http'

export const badRequest = (errors: any[]): IHttpResponse => ({
  statusCode: 400,
  body: errors
})

export const unauthorized = (): IHttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const ok = <T>(data: T): IHttpResponse => ({
  statusCode: 200,
  body: data
})

export const created = (): IHttpResponse => ({
  statusCode: 201,
  body: null
})

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null
})
