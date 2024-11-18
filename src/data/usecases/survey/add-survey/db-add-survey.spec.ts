import MockDate from 'mockdate'
import { IAddSurvey, IAddSurveyRepository } from './db-add-survey-interfaces'
import { DbAddSurvey } from './db-add-survey'
import { mockAddSurveyRepositoryStub } from '#data/test'
import { mockAddSurveyParams } from '#domain/test'

type SutTypes = {
  addSurveyRepositoryStub: IAddSurveyRepository
  sut: IAddSurvey
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = mockAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should calls AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(mockAddSurveyParams())

    expect(addSpy).toHaveBeenCalledWith(mockAddSurveyParams())
  })

  test('Should throw if AddSurveyRepository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.add(mockAddSurveyParams())

    await expect(promise).rejects.toThrow()
  })
})
