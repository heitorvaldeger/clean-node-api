import { AccountModel } from '#domain/model/account'

export type AddAccountParams = Omit<AccountModel, 'id'>
export interface IAddAccount {
  add: (account: AddAccountParams) => Promise<AccountModel | null>
}
