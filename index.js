import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import { getTotalPageEntries, getCardNumber, getAccessToken, getHearthstoneCardUrl } from './util.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

app.get('/', async (_, res) => {
    const access_token = await getAccessToken(process.env.REGION, process.env.CLIENT_ID, process.env.CLIENT_SECRET)

    const page = Math.floor(Math.random() * 103) + 1
    const totalPageEntries = getTotalPageEntries(page)
    const cardNumber = getCardNumber(totalPageEntries)

    const { cards } = await (await fetch(getHearthstoneCardUrl(access_token, page))).json()
    const { image } = cards[cardNumber]

    res.set('Content-Type', 'text/html')
    res.send(Buffer.from(`
        <a href='/'>
            <img src=${image} />
        </a>
    `))
})

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})