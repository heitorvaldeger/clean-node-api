import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_value') })
  },
  async compare (value: string, hash: string): Promise<boolean> {
    return await new Promise(resolve => { resolve(true) })
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')

    const salt = 12
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should returns hash on success', async () => {
    const sut = new BcryptAdapter()
    const hash = await sut.hash('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throws if bcrypt throws', async () => {
    const sut = new BcryptAdapter()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call compare with correct values', async () => {
    const sut = new BcryptAdapter()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'hash_value')

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'hash_value')
  })

  test('Should returns true when compare succeeds', async () => {
    const sut = new BcryptAdapter()
    const isValid = await sut.compare('any_value', 'hash_value')

    expect(isValid).toBe(true)
  })

  test('Should returns false when compare fails', async () => {
    const sut = new BcryptAdapter()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce((value, hash) => {
      return false
    })
    const isValid = await sut.compare('any_value', 'hash_value')

    expect(isValid).toBeFalsy()
  })
})
