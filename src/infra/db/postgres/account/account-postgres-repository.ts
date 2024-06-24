import { IAccountModel, IAddAccountModel, IAddAccountRepository } from '../../../../data/usecases/add-account/db-add-account-interfaces'
import { PostgresHelper } from '../helpers/postgres-helper'

export class AccountPostgresRepository implements IAddAccountRepository {
  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const accountTable = PostgresHelper.getTable('accounts')
    const accountData = await accountTable.insert<IAccountModel>(account).returning('*')

    if (!(accountData.length > 0)) {
      throw new Error('Account not found')
    }

    return accountData[0]
  }
}
