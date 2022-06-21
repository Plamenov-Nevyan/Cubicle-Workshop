const {isUsernameValid, isPasswordValid} = require('../utils/validators')

exports.registerMiddleware = (req, res, next) => {
   try{
    isUsernameValid(req.body.username)
    isPasswordValid(req.body.password, req.body.repeatPassword)
    next()
   }
   catch(err){
    res.locals.error = err.message
    return res.render('registerPage')
   }
}