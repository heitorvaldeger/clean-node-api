import { IController, IHttpRequest, IHttpResponse, IValidation, badRequest } from './add-survey-controller-interfaces'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    return await new Promise(resolve => {
      resolve({
        body: null,
        statusCode: 200
      })
    })
  }
}
