import { WithId } from 'mongodb'
import { IAddAccountRepository } from '../../../../data/interfaces/db/add-account-repository'
import { IAddAccountModel } from '../../../../data/usecases/add-account/db-add-account-interfaces'
import { IAccountModel } from '../../../../domain/model/account'
import { MongoHelper } from '../helpers/mongodb-helper'

export class AccountMongoRepository implements IAddAccountRepository {
  async add (account: IAddAccountModel): Promise<IAccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(account)
    const accountData = await accountCollection.findOne<WithId<IAccountModel>>({
      _id: insertedId
    })

    if (!accountData || !insertedId) {
      throw new Error('Account not found')
    }

    const { _id, ...rest } = accountData

    return ({
      ...rest,
      id: _id.toHexString()
    })
  }
}
