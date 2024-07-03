import { LogPostgresRepository } from '../../../../infra/db/postgres/log/log-postgres-repository'
import { LogControllerDecorator } from '../../../../presentation/controllers/decorators/log-controller-decorator'
import { IController } from '../../../../presentation/controllers/interfaces/controller'
import { SignUpController } from '../../../../presentation/controllers/auth/signup/signup-controller'
import { makeDbAddAccountFactory } from '../../usecases/db-add-account/db-add-account-factory'
import { makeDbAuthenticationFactory } from '../../usecases/db-authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpFactory = (): IController => {
  return new LogControllerDecorator(new SignUpController(makeDbAddAccountFactory(), makeSignUpValidation(), makeDbAuthenticationFactory()), new LogPostgresRepository())
}
