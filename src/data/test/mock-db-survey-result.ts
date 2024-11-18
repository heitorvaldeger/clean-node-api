import { ISaveSurveyResultRepository } from '#data/interfaces/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '#domain/model/survey-result'
import { mockSaveResultModel } from '#domain/test'
import { SaveSurveyResultParams } from '#domain/usecases/interfaces/survey-result/save-survey-result'

export const mockSaveSurveyResultRepositoryStub = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await new Promise((resolve) => { resolve(mockSaveResultModel()) })
    }
  }

  return new SaveSurveyResultRepositoryStub()
}
