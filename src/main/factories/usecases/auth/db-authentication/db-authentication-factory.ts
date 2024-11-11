import env from '#main/config/env'
import { DbAuthentication } from '#data/usecases/account/authentication/db-authentication'
import { IAuthentication } from '#domain/usecases/interfaces/account/authentication'
import { BcryptAdapter } from '#infra/crypto/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '#infra/crypto/jwt-adapter/jwt-adapter'
import { AccountPostgresRepository } from '#infra/db/postgres/account/account-postgres-repository'

export const makeDbAuthenticationFactory = (): IAuthentication => {
  const accountPostgresRepository = new AccountPostgresRepository()
  const bcryptAdapter = new BcryptAdapter()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(accountPostgresRepository, bcryptAdapter, jwtAdapter, accountPostgresRepository)
}
