import jwt from 'jsonwebtoken'
import { IEncrypter } from '../../../data/interfaces/crypto/encrypter'

export class JwtAdapter implements IEncrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => { resolve(jwt.sign({ id: value }, this.secret)) })
  }
}
