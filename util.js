import { BlizzAPI } from 'blizzapi'

export const getAccessToken = (region, clientId, clientSecret) => (
    new BlizzAPI({
        region,
        clientId,
        clientSecret
    }).getAccessToken(
        region,
        clientId,
        clientSecret
    )
)

export const getTotalPageEntries = (page) => page === 103 ? 12 : 39

export const getCardNumber = (totalPageEntries) => Math.floor(Math.random() * totalPageEntries) + 1

export const getHearthstoneCardUrl = (access_token, page) =>
    `https://us.api.blizzard.com/hearthstone/cards?locale=en_US&access_token=${access_token}&page=${page}`