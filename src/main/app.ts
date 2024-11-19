import express from 'express'
import { serve, setup } from 'swagger-ui-express'
import { bodyParser, cors } from './middlewares'
import routes from './config/routes'
import swaggerConfig from './docs'
import { noCache } from './middlewares/no-cache'

const app = express()

app.use('/api-docs', serve, setup(swaggerConfig))
app.use(bodyParser)
app.use(cors)
app.use(noCache)
routes(app)

export default app
