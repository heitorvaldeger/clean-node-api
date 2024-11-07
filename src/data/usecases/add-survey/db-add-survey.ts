import { IAddSurvey, AddSurveyModel, IAddSurveyRepository } from './db-add-survey-interfaces'

export class DbAddSurvey implements IAddSurvey {
  constructor (
    private readonly addSurveyRepository: IAddSurveyRepository
  ) {}

  async add (surveyData: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(surveyData)
  }
}
