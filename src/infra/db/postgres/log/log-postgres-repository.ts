import { ILogErrorRepository } from '#data/interfaces/db/log/log-error-repository'
import { PostgresHelper } from '../helpers/postgres-helper'

export class LogPostgresRepository implements ILogErrorRepository {
  async logError (stack: string): Promise<void> {
    await PostgresHelper.getTable('errors').insert({
      stack,
      date: new Date()
    })
  }
}
