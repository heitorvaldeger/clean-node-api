import { PostgresHelper } from '#infra/db/postgres/helpers/postgres-helper'
import env from './config/env'

const run = async (): Promise<void> => {
  PostgresHelper.connect()
  const app = (await import('./app')).default
  app.listen(env.port, () => { console.log(`Server running in port ${env.port}`) })
}

void run().then()
