import { IAccountModel } from '../../domain/model/account'
import { IAddAccountModel } from '../../domain/usecases/interfaces/add-account'

export interface IAddAccountRepository {
  add: (account: IAddAccountModel) => Promise<IAccountModel>
}
