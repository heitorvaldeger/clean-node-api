import { IAccountModel } from '../usecases/db-add-account-interfaces'

export interface ILoadAccountByEmailRepository {
  load: (email: string) => Promise<IAccountModel>
}
