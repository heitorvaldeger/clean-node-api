import { ISurveyModel, ILoadSurveysRepository } from './db-load-surveys-interfaces'
import { DbLoadSurveys } from './db-load-surveys'

const createdAt = new Date()
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
    createdAt
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
    createdAt
  }
])

class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
  async loadAll (): Promise<ISurveyModel[]> {
    return await new Promise(resolve => { resolve(makeFakeSurveys()) })
  }
}

interface SutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: LoadSurveysRepositoryStub
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()

    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('Should returns a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()

    expect(surveys).toEqual(makeFakeSurveys())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })
})
