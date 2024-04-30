import { MongoHelper } from '../infra/db/mongodb/helpers/mongodb-helper'
import env from './config/env'

void MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./app')).default
    app.listen(5050, () => { console.log(`Server running in port ${env.port}`) })
  })
  .catch(console.error)
