const verifyToken = (reqClient, resClient, next) => {
    console.log('Verify token...')
    if (!true) resClient.status(400).send('Token invalid')
    else next();
}

module.exports = verifyToken;