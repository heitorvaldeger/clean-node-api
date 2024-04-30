/* eslint-disable @typescript-eslint/no-floating-promises */
import fg from 'fast-glob'
import { Router, Express } from 'express'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  fg.sync('**/src/main/routes/**routes.ts')
    .map(async (fileName) => {
      (await import(`../../../${fileName}`)).default(router)
    })
}
