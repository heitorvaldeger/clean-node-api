import { AccountModel } from '../../model/account'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<AccountModel | null>
}
