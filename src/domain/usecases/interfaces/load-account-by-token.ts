import { IAccountModel } from '../../model/account'

export interface ILoadAccountByToken {
  load: (accessToken: string, role?: string) => Promise<IAccountModel | null>
}
