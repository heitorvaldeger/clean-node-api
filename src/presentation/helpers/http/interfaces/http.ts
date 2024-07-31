export interface IHttpRequest<B = any> {
  body?: B
  headers?: any
}

export interface IHttpResponse<T = any> {
  statusCode: number
  body: T
}
