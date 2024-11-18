import { AccountModel } from '#domain/model/account'
import { AddAccountParams } from '#domain/usecases/interfaces/account/add-account'

export const mockAddAccountParams = (): AddAccountParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password'
})

export const mockAccountModel = (): AccountModel => ({
  id: 'any_id',
  ...mockAddAccountParams()
})
