import { ISaveSurveyResultRepository, SurveyResultModel, ISaveSurveyResult, SaveSurveyResultParams } from './db-save-survey-result-interfaces'

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  ) {}

  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel | null> {
    return await this.saveSurveyResultRepository.save(data)
  }
}
