import { ISaveSurveyResultRepository, SurveyResultModel, ISaveSurveyResult, SaveSurveyResultModel } from './db-save-survey-result-interfaces'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    return await this.saveSurveyResultRepository.save(data)
  }
}
