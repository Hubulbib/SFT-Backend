/* Import dependencies */

import express from 'express'
import { connect } from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
/* Import dependencies */
/* Import routers */
import authRouter from './clientSide/sections/auth/routers/auth.router.js'

/* Import routers */
/* Import middlewares */
import authMiddleware from './clientSide/sections/auth/middlewares/auth.middleware.js'
import adminCheckMiddleware from './adminPanel/middlewares/adminCheck.middleware.js'
/* Import middlewares */
/* Import Admin routers */
import AdminUserRouter from './adminPanel/sections/user/routers/user.router.js'

/* Import Admin routers */

/* Constant declaration */

const PORT = process.env.PORT || 5000
const MONGODB = process.env.MONGODB || ''
const ORIGIN_URL = process.env.ORIGIN_URL || ''

/* Constant declaration */

/* Initialization app */

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: ORIGIN_URL,
  }),
)

app.use('/api/auth', authRouter)
app.use('/api/admin/users', [authMiddleware, adminCheckMiddleware], AdminUserRouter)

/* Initialization app */

/* App start */

connect(MONGODB)
  .then(() => app.listen(PORT, () => console.log(`Server has been started on ${PORT}`)))
  .catch((err) => console.log(err))

/* App start */
