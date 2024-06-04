import { IAccountModel } from '../../../usecases/add-account/db-add-account-interfaces'

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<IAccountModel | null>
}
