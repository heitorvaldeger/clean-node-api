import { IAccountModel } from '../../../domain/model/account'
import { ILoadAccountByToken } from '../../../domain/usecases/interfaces/load-account-by-token'
import { IDecrypter } from '../../interfaces/crypto/decrypter'
import { ILoadAccountByTokenRepository } from '../../interfaces/db/account/load-account-by-token-repository'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<IAccountModel | null> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
