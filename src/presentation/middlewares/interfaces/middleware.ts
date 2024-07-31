import { IHttpRequest, IHttpResponse } from '../../helpers/http/interfaces/http'

export interface IMiddleware {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
