export type HttpRequest<B = any> = {
  body?: B
  headers?: any
}

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}
