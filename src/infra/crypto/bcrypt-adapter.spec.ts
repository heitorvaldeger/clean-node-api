import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await new Promise(resolve => { resolve('hashed_value') })
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call Bcrypt Adapter with correct values', async () => {
    const sut = new BcryptAdapter()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    const salt = 12
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should returns hash on success', async () => {
    const sut = new BcryptAdapter()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  test('Should throws if bcrypt throws', async () => {
    const sut = new BcryptAdapter()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })

    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})
