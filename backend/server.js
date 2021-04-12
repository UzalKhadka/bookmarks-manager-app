import express from 'express'
import dotenv from 'dotenv'

import connectDB from './congig/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('Backend API is running...')
})

app.use(express.json())

app.use('/api/users', userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`))
