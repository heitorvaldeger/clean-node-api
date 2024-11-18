import MockDate from 'mockdate'
import { IAddSurvey, AddSurveyParams, IController, HttpRequest, ValidationError, badRequest, created, serverError } from './add-survey-controller-interfaces'
import { AddSurveyController } from './add-survey-controller'
import { IValidationComposite } from '#validations/interfaces/validation-composite'

const makeFakeRequest = (): HttpRequest => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    createdAt: new Date()
  }
})

class ValidationStub implements IValidationComposite {
  validate (input: any): ValidationError[] | null {
    return null
  }
}

class AddSurveyStub implements IAddSurvey {
  async add (surveyData: AddSurveyParams): Promise<void> {
  }
}

type SutType = {
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
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should calls Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(makeFakeRequest())

    expect(validateSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should returns 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce([
      {
        fieldName: 'any_fieldname',
        message: 'any_message'
      }
    ])
    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(badRequest([
      {
        fieldName: 'any_fieldname',
        message: 'any_message'
      }
    ]))
  })

  test('Should calls AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    await sut.handle(makeFakeRequest())

    expect(addSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })

  test('Should returns 500 if AddSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should returns 201 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest())

    expect(httpResponse).toEqual(created())
  })
})
