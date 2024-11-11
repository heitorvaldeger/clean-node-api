import { DbLoadSurveys } from '#data/usecases/survey/load-surveys/db-load-surveys'
import { ILoadSurveys } from '#domain/usecases/interfaces/survey/load-surveys'
import { SurveyPostgresRepository } from '#infra/db/postgres/survey/survey-postgres-repository'

export const makeDbLoadSurveysFactory = (): ILoadSurveys => {
  const surveyPostgresRepository = new SurveyPostgresRepository()
  return new DbLoadSurveys(surveyPostgresRepository)
}
