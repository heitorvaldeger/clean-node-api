import { AccountModel } from '#domain/model/account'
import { AddAccountModel } from '#domain/usecases/interfaces/account/add-account'

export interface IAddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
