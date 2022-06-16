const {cookieName, secret} = require('../config/authConstants')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let token = req.cookies[cookieName]
    if(token){
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err){return res.render('404', {status:`402 - Forbidden`, message: `Invalid access token`})}
            req.user = decodedToken
            res.locals.user = decodedToken
        })
    }
    next()
}