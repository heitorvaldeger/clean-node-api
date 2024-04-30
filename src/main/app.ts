import express from 'express'
import { bodyParser, cors } from './middlewares'

const app = express()

app.use(bodyParser)
app.use(cors)

export default app
