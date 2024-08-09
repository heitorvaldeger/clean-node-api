import { ISurveyModel, ILoadSurveysRepository } from './db-load-surveys-interfaces'
import { DbLoadSurveys } from './db-load-surveys'
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

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
      async loadAll (): Promise<ISurveyModel[]> {
        return await new Promise(resolve => { resolve(makeFakeSurveys()) })
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    await sut.load()

    expect(loadAllSpy).toHaveBeenCalled()
  })
})
