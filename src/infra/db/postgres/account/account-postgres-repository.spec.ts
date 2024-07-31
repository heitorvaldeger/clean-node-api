/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { PostgresHelper } from '../helpers/postgres-helper'
import { AccountPostgresRepository } from './account-postgres-repository'

describe('AccountPostgresRepository', () => {
  beforeAll(() => {
    PostgresHelper.connect()
  })

  beforeEach(async () => {
    await PostgresHelper.getTable('accounts').whereNotNull('id').del()
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = new AccountPostgresRepository()
      const account = await sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })

      expect(account).toBeTruthy()
      expect(account.id).toBeTruthy()
      expect(account.name).toBe('any_name')
      expect(account.email).toBe('any_email@mail.com')
      expect(account.password).toBe('any_password')
    })

    test('Should throws the add account error', async () => {
      jest.spyOn(PostgresHelper, 'getTable').mockImplementationOnce((): any => {
        return ({
          insert () {
            return this
          },
          returning () {
            return []
          }
        })
      })

      const sut = new AccountPostgresRepository()
      const promise = sut.add({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })

      await expect(promise).rejects.toThrow(new Error('Add account failure!'))
    })
  })

  describe('loadByEmail', () => {
    test('Should return an account on loadByEmail success', async () => {
      const accountTable = PostgresHelper.getTable('accounts')

      await accountTable.insert({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })

      const sut = new AccountPostgresRepository()
      const account = await sut.loadByEmail('any_email@mail.com')

      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })

    test('Should return null on loadByEmail fails', async () => {
      const sut = new AccountPostgresRepository()
      const account = await sut.loadByEmail('any_email@mail.com')

      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on updateAccessToken success', async () => {
      const insertedRows = await PostgresHelper.getTable('accounts').insert({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      }, '*')

      if (!(insertedRows.length > 0)) {
        throw new Error('Inserted rows failure!')
      }

      expect(insertedRows[0].accessToken).toBeFalsy()

      const sut = new AccountPostgresRepository()
      await sut.updateAccessToken(insertedRows[0].id, 'any_token')

      const account = await PostgresHelper.getTable('accounts').where('id', insertedRows[0].id).first()
      expect(account).toBeTruthy()
      expect(account?.accessToken).toBe('any_token')
    })

    test('Should throws the accessToken account error', async () => {
      const sut = new AccountPostgresRepository()
      const promise = sut.updateAccessToken('-1', 'any_token')

      await expect(promise).rejects.toThrow(new Error('Update access token failure!'))
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken success without role', async () => {
      const accountTable = PostgresHelper.getTable('accounts')

      await accountTable.insert({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })

      const sut = new AccountPostgresRepository()
      const account = await sut.loadByToken('any_token')

      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })
  })
})
