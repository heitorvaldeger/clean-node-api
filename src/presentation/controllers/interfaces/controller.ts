import { IHttpRequest, IHttpResponse } from '../../interfaces'

export interface IController {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
