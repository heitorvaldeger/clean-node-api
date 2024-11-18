import { ILoadSurveyByIdRepository } from './db-load-survey-by-id-interfaces'
import { DbLoadSurveyById } from './db-load-survey-by-id'
import { mockLoadSurveyByIdRepositoryStub } from '#data/test'
import { mockSurveyModel } from '#domain/test/mock-survey'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)

  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyById', () => {
  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById(0)

    expect(loadByIdSpy).toHaveBeenCalledWith(0)
  })

  test('Should return survey on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.loadById(0)

    expect(surveys).toEqual(mockSurveyModel())
  })

  test('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.loadById(0)

    await expect(promise).rejects.toThrow()
  })
})
