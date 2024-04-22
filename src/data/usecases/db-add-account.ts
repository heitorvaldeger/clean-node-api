import { IAccountModel, IAddAccount, IAddAccountModel, IEncrypter } from './db-add-account-interfaces'
export class DbAddAccount implements IAddAccount {
  constructor (
    private readonly encrypter: IEncrypter
  ) {}

  async add (account: IAddAccountModel): Promise<IAccountModel> {
    await this.encrypter.encrypt(account.password)

    return await new Promise(resolve => {
      resolve({
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      })
    })
  }
}
