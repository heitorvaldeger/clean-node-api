import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/crypto/bcrypt-adapter/bcrypt-adapter'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository'
import { AccountPostgresRepository } from '../../../infra/db/postgres/account/account-postgres-repository'
import { LogControllerDecorator } from '../../../presentation/controllers/decorators/log-controller-decorator'
import { IController } from '../../../presentation/controllers/interfaces/controller'
import { SignUpController } from '../../../presentation/controllers/signup/signup-controller'
import { makeSignUpValidation } from './signup-validation-factory'

export const makeSignUpFactory = (): IController => {
  const bcrypter = new BcryptAdapter()
  const addAccountRepository = new AccountPostgresRepository()
  const addAccount = new DbAddAccount(bcrypter, addAccountRepository)
  return new LogControllerDecorator(new SignUpController(addAccount, makeSignUpValidation()), new LogMongoRepository())
}
