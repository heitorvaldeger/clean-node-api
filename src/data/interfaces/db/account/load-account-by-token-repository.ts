import { IAccountModel } from '../../../usecases/add-account/db-add-account-interfaces'

export interface ILoadAccountByTokenRepository {
  loadByToken: (accessToken: string, role?: string) => Promise<IAccountModel | null>
}
