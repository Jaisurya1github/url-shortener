import express from 'express'
import { nanoid } from 'nanoid'
import Url from '../models/url.js'
import redisClient from '../utils/redisClient.js'

const router = express.Router()

router.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body
    const shortId = nanoid(6)

    const url = new Url({ originalUrl, shortId })
    await url.save()

    res.json({ shortUrl: `https://linkshort-njru.onrender.com/${shortId}` })
})

router.get('/:shortId', async (req, res) => {
    const { shortId } = req.params

    const cached = await redisClient.get(shortId)
    if (cached) return res.redirect(cached)

    const url = await Url.findOne({ shortId })
    if (url) {
        await redisClient.set(shortId, url.originalUrl)
        return res.redirect(url.originalUrl)
    }

    res.status(404).send('URL not found')

})


export default router
