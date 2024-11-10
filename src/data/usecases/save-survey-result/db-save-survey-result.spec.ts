import MockDate from 'mockdate'
import { DbSaveSurveyResult } from './db-save-survey-result'
import { ISaveSurveyResultRepository, SurveyResultModel, ISaveSurveyResult, SaveSurveyResultModel } from './db-save-survey-result-interfaces'

const makeFakeSaveResultData = (): SaveSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

const makeFakeSaveResult = (): SurveyResultModel => Object.assign({}, makeFakeSaveResultData(), { id: 'any_id' })

class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    return await new Promise((resolve) => { resolve(makeFakeSaveResult()) })
  }
}

type SutTypes = {
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
  sut: ISaveSurveyResult
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = new SaveSurveyResultRepositoryStub()
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
    await sut.save(makeFakeSaveResultData())

    expect(saveSpy).toHaveBeenCalledWith(makeFakeSaveResultData())
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))

    const promise = sut.save(makeFakeSaveResultData())

    await expect(promise).rejects.toThrow()
  })
})
