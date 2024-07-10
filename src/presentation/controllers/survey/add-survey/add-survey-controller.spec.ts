import { IAddSurvey, IAddSurveyModel, IController, IHttpRequest, badRequest, created, serverError } from './add-survey-controller-interfaces'
import { AddSurveyController } from './add-survey-controller'
import { IValidationComposite } from '../../../../validations/interfaces/validation-composite'
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

class ValidationStub implements IValidationComposite {
  validate (input: any): Error[] | null {
    return null
  }
}

class AddSurveyStub implements IAddSurvey {
  async add (surveyData: IAddSurveyModel): Promise<void> {
  }
}

interface SutType {
  sut: IController
  validationStub: IValidationComposite
  addSurveyStub: IAddSurvey
}

const makeSut = (): SutType => {
  const validationStub = new ValidationStub()
  const addSurveyStub = new AddSurveyStub()
  const sut = new AddSurveyController(validationStub, addSurveyStub)

  return {
    validationStub,
    sut,
    addSurveyStub
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
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce([
      new Error()
    ])
    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(badRequest([
      new Error()
    ]))
  })

  test('Should calls AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    await sut.handle(fakeRequest)

    expect(addSpy).toHaveBeenCalledWith(fakeRequest.body)
  })

  test('Should returns 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should returns 201 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(fakeRequest)

    expect(httpResponse).toEqual(created())
  })
})
