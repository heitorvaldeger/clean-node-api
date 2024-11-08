import { AccountModel } from '../../model/account'

export type AddAccountModel = Omit<AccountModel, 'id'>
export interface IAddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}
