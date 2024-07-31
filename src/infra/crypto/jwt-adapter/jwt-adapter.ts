import jwt from 'jsonwebtoken'
import { IEncrypter } from '../../../data/interfaces/crypto/encrypter'
import { IDecrypter } from '../../../data/interfaces/crypto/decrypter'

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor (
    private readonly secret: string
  ) {}

  async encrypt (value: string): Promise<string> {
    return await new Promise(resolve => { resolve(jwt.sign({ id: value }, this.secret)) })
  }

  async decrypt (token: string): Promise<string> {
    const value = jwt.verify(token, this.secret) as string

    return await new Promise(resolve => { resolve(value) })
  }
}
