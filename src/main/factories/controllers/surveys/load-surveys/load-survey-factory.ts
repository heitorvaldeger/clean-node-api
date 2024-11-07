import { LogControllerDecorator } from '#presentation/controllers/decorators/log/log-controller-decorator'
import { IController } from '#presentation/controllers/interfaces/controller'
import { LogPostgresRepository } from '#infra/db/postgres/log/log-postgres-repository'
import { LoadSurveysController } from '#presentation/controllers/survey/load-surveys/load-surveys-controller'
import { makeDbLoadSurveysFactory } from '#main/factories/usecases/survey/db-load-surveys/db-load-surveys-factory'

export const makeLoadSurveysFactory = (): IController => {
  return new LogControllerDecorator(new LoadSurveysController(makeDbLoadSurveysFactory()), new LogPostgresRepository())
}
