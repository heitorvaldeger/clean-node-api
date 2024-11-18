import { IDecrypter } from '#data/interfaces/crypto/decrypter'
import { IEncrypter } from '#data/interfaces/crypto/encrypter'
import { IHashComparer } from '#data/interfaces/crypto/hash-comparer'
import { IHasher } from '#data/interfaces/crypto/hasher'

export const mockDecrypt = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    async decrypt (value: string): Promise<string | null> {
      return await new Promise(resolve => { resolve('any_value') })
    }
  }

  return new DecrypterStub()
}

export const mockEncrypt = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (id: string): Promise<string> {
      return await new Promise(resolve => { resolve('any_token') })
    }
  }

  return new EncrypterStub()
}

export const mockHashComparer = (): IHashComparer => {
  class HashComparerStub implements IHashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => { resolve(true) })
    }
  }

  return new HashComparerStub()
}

export const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => { resolve('hashed_password') })
    }
  }

  return new HasherStub()
}
