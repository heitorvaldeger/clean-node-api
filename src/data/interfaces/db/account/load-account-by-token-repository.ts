import { AccountModel } from '#data/usecases/account/add-account/db-add-account-interfaces'

export interface ILoadAccountByTokenRepository {
  loadByToken: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
