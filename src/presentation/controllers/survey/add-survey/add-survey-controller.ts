import { IController, IHttpRequest, IHttpResponse, IValidation } from './add-survey-controller-interfaces'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    this.validation.validate(httpRequest.body)
    return await new Promise(resolve => {
      resolve({
        body: null,
        statusCode: 200
      })
    })
  }
}
