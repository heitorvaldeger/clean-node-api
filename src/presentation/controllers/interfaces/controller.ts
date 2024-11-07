import { HttpRequest, HttpResponse } from '../../helpers/http/interfaces/http'

export interface IController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
