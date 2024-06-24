import { IAccountModel, IAddAccountModel, IAddAccountRepository } from '../../../../data/usecases/add-account/db-add-account-interfaces'
import { ILoadAccountByEmailRepository, IUpdateAccessTokenRepository } from '../../../../data/usecases/authentication/db-authentication-interfaces'
import { PostgresHelper } from '../helpers/postgres-helper'

export class AccountPostgresRepository implements IAddAccountRepository, ILoadAccountByEmailRepository, IUpdateAccessTokenRepository {
  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const accountTable = PostgresHelper.getTable('accounts')
    const accountData = await accountTable.insert<IAccountModel>(account).returning('*')

    if (!(accountData.length > 0)) {
      throw new Error('Account not found')
    }

    return accountData[0]
  }

  async loadByEmail (email: string): Promise<IAccountModel | null> {
    const account = PostgresHelper.getTable('accounts').where('email', email).first<IAccountModel>()

    return await new Promise(resolve => { resolve(account) })
  }

  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const updatedRows = await PostgresHelper.getTable('accounts')
      .where('id', id)
      .update({
        accessToken
      }, '*')

    if (!(updatedRows.length > 0)) {
      throw new Error('Account not found')
    }

    return updatedRows[0]
  }
}
