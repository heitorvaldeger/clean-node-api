import bcrypt from 'bcrypt'
import { IEncrypter } from '../../data/interfaces/encrypter'

export class BcryptAdapter implements IEncrypter {
  constructor (
    private readonly salt: number = 12
  ) {
  }

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
