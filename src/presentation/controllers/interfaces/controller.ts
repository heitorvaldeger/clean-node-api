import { IHttpRequest, IHttpResponse } from '../../helpers/http/interfaces/http'

export interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
