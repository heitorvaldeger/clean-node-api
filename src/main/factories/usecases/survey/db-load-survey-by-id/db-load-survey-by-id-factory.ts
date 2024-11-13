import { DbLoadSurveyById } from '#data/usecases/survey/load-survey-by-id/db-load-survey-by-id'
import { ILoadSurveyById } from '#domain/usecases/interfaces/survey/load-survey-by-id'
import { SurveyPostgresRepository } from '#infra/db/postgres/survey/survey-postgres-repository'

export const makeDbLoadSurveyByIdFactory = (): ILoadSurveyById => {
  const surveyPostgresRepository = new SurveyPostgresRepository()
  return new DbLoadSurveyById(surveyPostgresRepository)
}
