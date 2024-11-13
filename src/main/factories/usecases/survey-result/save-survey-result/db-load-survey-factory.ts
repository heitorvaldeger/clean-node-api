import { DbSaveSurveyResult } from '#data/usecases/survey-result/save-survey-result/db-save-survey-result'
import { ISaveSurveyResult } from '#domain/usecases/interfaces/survey-result/save-survey-result'
import { SurveyResultPostgresRepository } from '#infra/db/postgres/survey-result/survey-result-postgres-repository'

export const makeDbSaveSurveyResultsFactory = (): ISaveSurveyResult => {
  const surveyResultPostgresRepository = new SurveyResultPostgresRepository()
  return new DbSaveSurveyResult(surveyResultPostgresRepository)
}
