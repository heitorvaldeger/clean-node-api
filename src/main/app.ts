import express from 'express'
import { serve, setup } from 'swagger-ui-express'
import { bodyParser, cors } from './middlewares'
import routes from './config/routes'
import swaggerConfig from './docs'

const app = express()

app.use('/api-docs', serve, setup(swaggerConfig))
app.use(bodyParser)
app.use(cors)
routes(app)

export default app
