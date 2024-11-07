import { AccountModel } from '#domain/model/account'
import { AddAccountModel } from '#domain/usecases/interfaces/add-account'

export interface IAddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
