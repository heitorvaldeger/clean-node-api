import express from 'express'
import { bodyParser, cors } from './middlewares'
import routes from './config/routes'

const app = express()

app.use(bodyParser)
app.use(cors)
routes(app)

export default app
