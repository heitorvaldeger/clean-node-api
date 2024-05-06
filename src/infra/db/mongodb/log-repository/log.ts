import { ILogErrorRepository } from '../../../../data/interfaces/log-error-repository'
import MongoHelper from '../helpers/mongodb-helper'

export class LogMongoRepository implements ILogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
