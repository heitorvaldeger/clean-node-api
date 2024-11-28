import { IValidationComposite } from '#validations/interfaces/validation-composite'
import { IAddSurvey, IController, HttpResponse, badRequest, created, serverError } from './add-survey-controller-interfaces'

export class AddSurveyController implements IController {
  constructor (
    private readonly validation: IValidationComposite,
    private readonly addSurvey: IAddSurvey
  ) {}

  async handle (request: AddSurveyController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = request
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

export namespace AddSurveyController {
  export type Request = {
    question: string
    answers: Answer[]
  }

  type Answer = {
    image?: string
    answer: string
  }
}
