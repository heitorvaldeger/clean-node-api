import { DbAddAccount } from '#data/usecases/account/add-account/db-add-account'
import { IAddAccount } from '#domain/usecases/interfaces/account/add-account'
import { BcryptAdapter } from '#infra/crypto/bcrypt-adapter/bcrypt-adapter'
import { AccountPostgresRepository } from '#infra/db/postgres/account/account-postgres-repository'

export const makeDbAddAccountFactory = (): IAddAccount => {
  const bcrypter = new BcryptAdapter()
  const accountPostgresRepository = new AccountPostgresRepository()
  return new DbAddAccount(bcrypter, accountPostgresRepository, accountPostgresRepository)
}
