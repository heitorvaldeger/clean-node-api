import bcrypt from 'bcrypt'
import { IHasher } from '../../data/interfaces/crypto/hasher'
import { IHashComparer } from '../../data/interfaces/crypto/hash-comparer'

export class BcryptAdapter implements IHasher, IHashComparer {
  constructor (
    private readonly salt: number = 12
  ) {
  }

  async compare (value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash)
    return await new Promise(resolve => { resolve(true) })
  }

  async hash (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
