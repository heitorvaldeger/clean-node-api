import { HttpResponse } from '../../helpers/http/interfaces/http'

export interface IController<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
