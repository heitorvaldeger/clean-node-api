import { ILogErrorRepository } from '#data/interfaces/db/log/log-error-repository'

export const mockLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepository implements ILogErrorRepository {
    async logError (stack: string): Promise<void> {
      await new Promise((resolve) => { resolve(null) })
    }
  }

  return new LogErrorRepository()
}
