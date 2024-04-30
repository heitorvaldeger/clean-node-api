import { EmailValidatorAdapter } from '../../adapters/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/db-add-account'
import { BcryptAdapter } from '../../infra/crypto/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'

export const makeSignUpFactory = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const bcrypter = new BcryptAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const addAccount = new DbAddAccount(bcrypter, addAccountRepository)
  return new SignUpController(emailValidator, addAccount)
}
