import { IAddSurvey, IController, IHttpRequest, IHttpResponse, IValidation, badRequest, ok } from './add-survey-controller-interfaces'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidation,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    const { question, answers } = httpRequest.body
    await this.addSurvey.add({
      question,
      answers
    })

    return ok({})
  }
}
