/* Import dependencies */

import express from 'express'
import {connect} from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'

/* Import dependencies */

/* Import routers */



/* Import routers */


/* Constant declaration */

const PORT = process.env.PORT || 5000
const MONGODB = process.env.MONGODB || ''
const ORIGIN_URL = process.env.ORIGIN_URL || ''

/* Constant declaration */


/* Initialization app */

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: ORIGIN_URL
}))

/* Initialization app */


/* App start */

connect(MONGODB)
    .then(() => app.listen(PORT, () => console.log(`Server has been started on ${PORT}`)))
    .catch(err => console.log(err))

/* App start */