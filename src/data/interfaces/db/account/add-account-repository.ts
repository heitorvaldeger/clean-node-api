import { AccountModel } from '#domain/model/account'
import { AddAccountParams } from '#domain/usecases/interfaces/account/add-account'

export interface IAddAccountRepository {
  add: (account: AddAccountParams) => Promise<AccountModel>
}
