import bcrypt from 'bcrypt'
import { IHasher } from '../../data/interfaces/crypto/hasher'

export class BcryptAdapter implements IHasher {
  constructor (
    private readonly salt: number = 12
  ) {
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
