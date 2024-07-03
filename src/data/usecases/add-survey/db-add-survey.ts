import { IAddSurvey, IAddSurveyModel, IAddSurveyRepository } from './db-add-survey-interfaces'

export class DbAddSurvey implements IAddSurvey {
  constructor (
    private readonly addSurveyRepository: IAddSurveyRepository
  ) {}

  async add (surveyData: IAddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(surveyData)
  }
}
