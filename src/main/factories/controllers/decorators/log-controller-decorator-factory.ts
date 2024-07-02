import { LogPostgresRepository } from '../../../../infra/db/postgres/log/log-postgres-repository'
import { LogControllerDecorator } from '../../../../presentation/controllers/decorators/log-controller-decorator'
import { IController } from '../../../../presentation/controllers/interfaces/controller'

export const makeLogControllerDecoratorFactory = (controller: IController): IController => {
  return new LogControllerDecorator(controller, new LogPostgresRepository())
}
