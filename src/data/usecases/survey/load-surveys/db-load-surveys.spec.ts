import { ILoadSurveysRepository } from './db-load-surveys-interfaces'
import { DbLoadSurveys } from './db-load-surveys'
import { mockLoadSurveysRepositoryStub } from '#data/test'
import { mockSurveyModels } from '#domain/test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: ILoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepositoryStub()
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

    expect(surveys).toEqual(mockSurveyModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.load()

    await expect(promise).rejects.toThrow()
  })
})
