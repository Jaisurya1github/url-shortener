import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import urlRoutes from './routes/url.js'

dotenv.config()

const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err))

app.use('/', urlRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
