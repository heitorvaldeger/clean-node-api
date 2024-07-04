export interface IHttpRequest<B = any> {
  body?: B
}

export interface IHttpResponse<T = any> {
  statusCode: number
  body: T
}
