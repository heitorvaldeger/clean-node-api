export interface IHttpRequest<B = any> {
  body?: B
}

export interface IHttpResponse {
  statusCode: number
  body: any
}
