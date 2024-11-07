import { IValidationComposite } from '#validations/interfaces/validation-composite'
import { IAddSurvey, AddSurveyModel, IController, HttpRequest, HttpResponse, badRequest, created, serverError } from './add-survey-controller-interfaces'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidationComposite,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (httpRequest: HttpRequest<AddSurveyModel>): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = httpRequest.body!
      await this.addSurvey.add({
        question,
        answers,
        createdAt: new Date()
      })

      return created()
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
