import { IAddAccountRepository } from '#data/interfaces/db/account/add-account-repository'
import { ILoadAccountByTokenRepository } from '#data/interfaces/db/account/load-account-by-token-repository'
import { IUpdateAccessTokenRepository } from '#data/interfaces/db/account/update-access-token-repository'
import { ILoadAccountByEmailRepository } from '#data/usecases/account/add-account/db-add-account-interfaces'
import { AccountModel } from '#domain/model/account'
import { mockAccountModel } from '#domain/test'
import { AddAccountParams } from '#domain/usecases/interfaces/account/add-account'

export const mockAddAccountRepository = (): IAddAccountRepository => {
  class AddAccountRepositoryStub implements IAddAccountRepository {
    async add (account: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }

  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepositoryStub = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel | null> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }

  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepositoryStub = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async loadByToken (accessToken: string, role?: string): Promise<AccountModel | null> {
      return await new Promise(resolve => { resolve(mockAccountModel()) })
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepositoryStub = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {
      await new Promise(resolve => { resolve(null) })
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}
