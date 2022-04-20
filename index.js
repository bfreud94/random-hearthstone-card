import express from 'express'
import fetch from 'node-fetch'
import { BlizzAPI } from 'blizzapi'
import dotenv from 'dotenv'

dotenv.config()


const app = express()
const port = process.env.PORT || 8000

app.get('/', async (_, res) => {
    const api = new BlizzAPI({
        region: 'us',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })
    const page = Math.floor(Math.random() * 103) + 1
    const upperLimit = page === 103 ? 13 : 40
    const cardNumber = Math.floor(Math.random() * upperLimit) + 1
    const access_token = await api.getAccessToken({
        region: 'us',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
    })

    const { cards } = await (await fetch(`https://us.api.blizzard.com/hearthstone/cards?locale=en_US&access_token=${access_token}&page=${page}`)).json()
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