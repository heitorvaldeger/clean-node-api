import { IAccountModel } from '../usecases/add-account/db-add-account-interfaces'

export interface ILoadAccountByEmailRepository {
  load: (email: string) => Promise<IAccountModel>
}
