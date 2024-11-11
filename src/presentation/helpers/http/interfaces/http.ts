export type HttpRequest<B = any> = {
  body?: B
  params?: any
  headers?: any
}

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}
