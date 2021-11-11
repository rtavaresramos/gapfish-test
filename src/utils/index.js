
export const generateShortLink = originalUrl => {
    let linkId = getRandomString(6)
    let curUrl = window.location.href

    let newLinkToAdd = {
        linkId,
        shortUrl: `${curUrl}${linkId}`,
        originalUrl,
        createdDate: `${new Date()}`
    }
    return newLinkToAdd
}

const getRandomString = length => {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}