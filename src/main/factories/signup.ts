import { EmailValidatorAdapter } from '../../adapters/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/db-add-account'
import { BcryptAdapter } from '../../infra/crypto/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from '../../presentation/controllers/decorators/log'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { IController } from '../../presentation/interfaces'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpFactory = (): IController => {
  const emailValidator = new EmailValidatorAdapter()
  const bcrypter = new BcryptAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcrypter, addAccountRepository)
  return new LogControllerDecorator(new SignUpController(emailValidator, addAccount, makeSignUpValidation()), new LogMongoRepository())
}
