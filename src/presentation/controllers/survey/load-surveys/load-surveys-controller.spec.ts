import MockDate from 'mockdate'
import { ILoadSurveys, ISurveyModel } from './load-survey-controller-interfaces'
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

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements ILoadSurveys {
      async load (): Promise<ISurveyModel[]> {
        return await new Promise(resolve => { resolve(makeFakeSurveys()) })
      }
    }
    const loadSurveysStub = new LoadSurveysStub()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    const sut = new LoadSurveysController(loadSurveysStub)
    await sut.handle({})

    expect(loadSpy).toHaveBeenCalled()
  })
})
