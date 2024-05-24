import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/crypto/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../../../presentation/controllers/decorators/log'
import { IController } from '../../../presentation/controllers/interfaces/controller'
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpFactory = (): IController => {
  const bcrypter = new BcryptAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcrypter, addAccountRepository)
  return new LogControllerDecorator(new SignUpController(addAccount, makeSignUpValidation()), new LogMongoRepository())
}
