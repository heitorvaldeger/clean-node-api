/* eslint-disable @typescript-eslint/no-floating-promises */
import { Router, Express } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  readdirSync(path.join(__dirname, '/../routes')).map(async (file) => {
    if (!file.includes('.test.')) {
      return (await import(path.join(__dirname, '/../routes/', file))).default(router)
    }
  })
}
