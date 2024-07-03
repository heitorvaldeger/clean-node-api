import { IController, IHttpRequest, IValidation, badRequest } from './add-survey-controller-interfaces'
import { AddSurveyController } from './add-survey-controller'
const fakeRequest: IHttpRequest = {
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }
}

class ValidationStub implements IValidation {
  validate (input: any): Error | null {
    return null
  }
}

interface SutType {
  sut: IController
  validationStub: IValidation
}

const makeSut = (): SutType => {
  const validationStub = new ValidationStub()
  const sut = new AddSurveyController(validationStub)

  return {
    validationStub,
    sut
  }
}

describe('AddSurvey Controller', () => {
  test('Should calls Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(fakeRequest)

    expect(validateSpy).toHaveBeenCalledWith(fakeRequest.body)
  })

  test('Should returns 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(badRequest(new Error()))
  })
})
