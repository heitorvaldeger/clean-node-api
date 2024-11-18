import { ObjectId, WithId } from 'mongodb'
import { IAddAccountRepository } from '#data/interfaces/db/account/add-account-repository'
import { AddAccountParams } from '#data/usecases/account/add-account/db-add-account-interfaces'
import { AccountModel } from '#domain/model/account'
import { MongoHelper } from '../helpers/mongodb-helper'
import { ILoadAccountByEmailRepository } from '#data/interfaces/db/account/load-account-by-email-repository'
import { IUpdateAccessTokenRepository } from '#data/interfaces/db/account/update-access-token-repository'

export class AccountMongoRepository implements
  IAddAccountRepository,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository {
  async updateAccessToken (id: string, accessToken: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken
      }
    })
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne<WithId<AccountModel>>({ email })

    return account && ({
      id: account._id.toHexString(),
      email: account.email,
      name: account.name,
      password: account.password
    })
  }

  async add (account: AddAccountParams): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const { insertedId } = await accountCollection.insertOne(account)
    const accountData = await accountCollection.findOne<WithId<AccountModel>>({
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
