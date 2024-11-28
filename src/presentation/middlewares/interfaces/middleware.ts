import { HttpResponse } from '../../helpers/http/interfaces/http'

export interface IMiddleware<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
