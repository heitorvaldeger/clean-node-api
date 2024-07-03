import { LogControllerDecorator } from '../../../../../presentation/controllers/decorators/log-controller-decorator'
import { IController } from '../../../../../presentation/controllers/interfaces/controller'
import { LoginController } from '../../../../../presentation/controllers/auth/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { LogPostgresRepository } from '../../../../../infra/db/postgres/log/log-postgres-repository'
import { makeDbAuthenticationFactory } from '../../../usecases/db-authentication/db-authentication-factory'

export const makeLoginFactory = (): IController => {
  return new LogControllerDecorator(new LoginController(makeLoginValidation(), makeDbAuthenticationFactory()), new LogPostgresRepository())
}
