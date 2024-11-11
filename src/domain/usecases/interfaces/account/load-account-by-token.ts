import { AccountModel } from '#domain/model/account'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
