import { IAccountModel } from '../../../domain/model/account'
import { ILoadAccountByToken } from '../../../domain/usecases/interfaces/load-account-by-token'
import { IDecrypter } from '../../interfaces/crypto/decrypter'

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor (
    private readonly decrypter: IDecrypter
  ) {}

  async load (accessToken: string, role?: string): Promise<IAccountModel | null> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
