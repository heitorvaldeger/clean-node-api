import MockDate from 'mockdate'
import { ILoadSurveys, ISurveyModel, noContent, ok, serverError } from './load-survey-controller-interfaces'
import { LoadSurveysController } from './load-surveys-controller'

const makeFakeSurveys = (): ISurveyModel[] => ([
  {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    createdAt: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [
      {
        image: 'other_image',
        answer: 'other_answer'
      }
    ],
    createdAt: new Date()
  }
])

class LoadSurveysStub implements ILoadSurveys {
  async load (): Promise<ISurveyModel[]> {
    return await new Promise(resolve => { resolve(makeFakeSurveys()) })
  }
}

interface SutTypes {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveysStub
}
const makeSut = (): SutTypes => {
  const loadSurveysStub = new LoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)

  return {
    sut,
    loadSurveysStub
  }
}
describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})

    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should returns 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should returns 204 if LoadSurveys returns empty list', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise(resolve => { resolve([]) }))
    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(noContent())
  })

  test('Should returns 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const httpResponse = await sut.handle({})

    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
