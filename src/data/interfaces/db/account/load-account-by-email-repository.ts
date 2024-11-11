import { AccountModel } from '#data/usecases/account/add-account/db-add-account-interfaces'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<AccountModel | null>
}
