import { IAddSurveyRepository } from '#data/interfaces/db/survey/add-survey-repository'
import { ILoadSurveyByIdRepository } from '#data/interfaces/db/survey/load-survey-by-id-repository'
import { ILoadSurveysRepository } from '#data/interfaces/db/survey/load-surveys-repository'
import { SurveyModel } from '#domain/model/survey'
import { mockSurveyModel, mockSurveyModels } from '#domain/test/mock-survey'
import { AddSurveyParams } from '#domain/usecases/interfaces/survey/add-survey'

export const mockAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
    }
  }

  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepositoryStub = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (surveyId: string): Promise<SurveyModel> {
      return await new Promise(resolve => { resolve(mockSurveyModel()) })
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return await new Promise(resolve => { resolve(mockSurveyModels()) })
    }
  }

  return new LoadSurveysRepositoryStub()
}
