import { HttpRequest, HttpResponse } from '../../helpers/http/interfaces/http'

export interface IMiddleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
