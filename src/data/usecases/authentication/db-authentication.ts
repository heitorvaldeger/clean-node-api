import { AuthenticationModel, IAuthentication } from '../../../domain/usecases/interfaces/authentication'
import { IHashComparer } from '../../interfaces/crypto/hash-comparer'
import { ITokenGenerator } from '../../interfaces/crypto/token-generator'
import { ILoadAccountByEmailRepository } from '../../interfaces/db/load-account-by-email-repository'

export class DbAuthentication implements IAuthentication {
  constructor (
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: ITokenGenerator
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }
    return null
  }
}
