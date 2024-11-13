import { LogControllerDecorator } from '#presentation/controllers/decorators/log/log-controller-decorator'
import { IController } from '#presentation/controllers/interfaces/controller'
import { LogPostgresRepository } from '#infra/db/postgres/log/log-postgres-repository'
import { SaveSurveyResultController } from '#presentation/controllers/survey-result/save-survey-result-controller'
import { makeDbSaveSurveyResultsFactory } from '#main/factories/usecases/survey-result/save-survey-result/db-load-survey-factory'
import { makeDbLoadSurveyByIdFactory } from '#main/factories/usecases/survey/db-load-survey-by-id/db-load-survey-by-id-factory'

export const makeSaveSurveyResultFactory = (): IController => {
  return new LogControllerDecorator(new SaveSurveyResultController(
    makeDbLoadSurveyByIdFactory(),
    makeDbSaveSurveyResultsFactory()), new LogPostgresRepository())
}
