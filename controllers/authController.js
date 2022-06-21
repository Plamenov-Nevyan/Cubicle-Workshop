const router = require('express').Router()
const {authServices} = require('../services/authServices')
const jwt = require('jsonwebtoken')
const {secret, cookieName} = require('../config/authConstants')
const {registerMiddleware} = require('../middlewares/userValidationMiddleware')


router.get('/login', (req, res, next) => {
    try{
        res.render('loginPage')
    }catch(err){
        next(error)
    }
})
router.post('/login', async (req, res) => {
    try{
        let responseData = await authServices.checkIfPasswordExist(req.body)
        let token = jwt.sign(
            {
            username:responseData.user.username, 
            _id:responseData.user._id
            }, 
            secret, 
            {expiresIn:'2d'})
        res.cookie(cookieName,token,{httpOnly:true})
        res.redirect('/')
    }
    catch(error){
        res.locals.error = error.message
        return res.render('loginPage',)
    }
})

router.get('/register', (req, res, next) => {
    try{
        res.render('registerPage')
    }catch(err){
        next(error)
    }
    
})
router.post('/register', registerMiddleware, (req, res, next) => {
      authServices.checkIfUserExists(req.body.username)
      .then(async (result) => {
         if(!result){
            let user = await authServices.registerUser(req.body)
            let token = jwt.sign({username:user.username, _id: user._id}, secret, {expiresIn:'2d'})
            res.cookie(cookieName, token, {httpOnly:true})
            res.redirect('/')
         }
         else{
            res.locals.error = 'User already exists!'
            return res.render('registerPage')
         }
      })
      .catch(error => next(error))
})

router.get('/logout', (req, res, next) => {
  try{  
    res.clearCookie(cookieName)
    res.redirect('/')
}catch(error){
    next(error)
}
})

router.get('/my-profile', (req, res, next) => {
    authServices.getUserWithCubes(req.user._id)
    .then((user) => {
        user.cubes.forEach(cube => {cube.isOwner = String(cube.owner) == String(user._id)});
        res.render('profile', {user})
    })
    .catch(error => next(error))
})

router.get('/profile/:userId', (req, res,next) => {
    authServices.getUserWithCubes(req.params.userId)
    .then((user) => res.render('profile', {user}))
    .catch(error => next(error))
})

module.exports = router