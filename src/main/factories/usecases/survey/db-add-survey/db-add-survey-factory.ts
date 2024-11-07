import { DbAddSurvey } from '#data/usecases/add-survey/db-add-survey'
import { IAddSurvey } from '#domain/usecases/interfaces/add-survey'
import { SurveyPostgresRepository } from '#infra/db/postgres/survey/survey-postgres-repository'

export const makeDbAddSurveyFactory = (): IAddSurvey => {
  const surveyPostgresRepository = new SurveyPostgresRepository()
  return new DbAddSurvey(surveyPostgresRepository)
}
