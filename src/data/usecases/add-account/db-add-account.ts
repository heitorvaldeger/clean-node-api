import { IAccountModel, IAddAccount, IAddAccountModel, IAddAccountRepository, IHasher, ILoadAccountByEmailRepository } from './db-add-account-interfaces'
export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly Hasher: IHasher,
    private readonly addAccountRepository: IAddAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository
  ) {}

  async add (accountData: IAddAccountModel): Promise<IAccountModel | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (!account) {
      const hashedPassword = await this.Hasher.hash(accountData.password)
      const newAccount = await this.addAccountRepository.add({
        ...accountData,
        password: hashedPassword
      })

      return newAccount
    }

    return null
  }
}
