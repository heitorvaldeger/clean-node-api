import { DbLoadAccountByToken } from '#data/usecases/account/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '#infra/crypto/jwt-adapter/jwt-adapter'
import { AccountPostgresRepository } from '#infra/db/postgres/account/account-postgres-repository'
import { ILoadAccountByToken } from '#presentation/middlewares/auth-middleware-interfaces'
import env from '#main/config/env'

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const accountPostgresRepository = new AccountPostgresRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbLoadAccountByToken(jwtAdapter, accountPostgresRepository)
}
