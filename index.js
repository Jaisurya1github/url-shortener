import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import urlRoutes from './routes/url.js'
import cors from 'cors';

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB error:', err))

app.use('/', urlRoutes)

app.get('/', (req, res) => {
    res.send('Url-shorter backend running 🚀')
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
