import env from '../../config/env'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { BcryptAdapter } from '../../../infra/crypto/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/crypto/jwt-adapter/jwt-adapter'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { LogControllerDecorator } from '../../../presentation/controllers/decorators/log-controller-decorator'
import { IController } from '../../../presentation/controllers/interfaces/controller'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { AccountPostgresRepository } from '../../../infra/db/postgres/account/account-postgres-repository'

export const makeLoginFactory = (): IController => {
  const accountPostgresRepository = new AccountPostgresRepository()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(accountPostgresRepository, bcryptAdapter, jwtAdapter, accountPostgresRepository)
  return new LogControllerDecorator(new LoginController(makeLoginValidation(), dbAuthentication), new LogMongoRepository())
}
