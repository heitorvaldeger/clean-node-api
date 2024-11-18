import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { ISaveSurveyResultRepository, ISaveSurveyResult } from './db-save-survey-result-interfaces'
import { mockSaveResultModel, mockSaveResultParams } from '#domain/test'
import { mockSaveSurveyResultRepositoryStub } from '#data/test/mock-db-survey-result'

type SutTypes = {
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
  sut: ISaveSurveyResult
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)

  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should calls SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(mockSaveResultParams())

    expect(saveSpy).toHaveBeenCalledWith(mockSaveResultParams())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(Promise.reject(new Error()))

    const promise = sut.save(mockSaveResultParams())

    await expect(promise).rejects.toThrow()
  })

  test('Should return survey result on success', async () => {
    const { sut } = makeSut()
    const surveyResultData = await sut.save(mockSaveResultParams())

    expect(surveyResultData).toEqual(mockSaveResultModel())
  })
})
