// export type HttpRequest<B = any> = {
//   body?: B
//   params?: any
//   headers?: any
//   accountId?: string
// }

export type HttpResponse<T = any> = {
  statusCode: number
  body: T
}
