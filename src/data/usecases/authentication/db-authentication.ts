import { AuthenticationModel, IAuthentication } from '../../../domain/usecases/interfaces/authentication'
import { ILoadAccountByEmailRepository } from '../../interfaces/db/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
