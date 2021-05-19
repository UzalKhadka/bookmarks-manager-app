import express from 'express'
import fileUpload from 'express-fileupload'
import dotenv from 'dotenv'
import cors from 'cors'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

const PORT_NUM = 5000

dotenv.config()

connectDB()

const app = express()

//some middlewares required
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.json({ limit: '50mb' }))

app.get('/', (req, res) => {
  res.send('Backend API is running...')
})

app.use('/api/users', userRoutes)

//custom middllewares
app.use(notFound)
app.use(errorHandler)

const PORT = PORT_NUM || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
