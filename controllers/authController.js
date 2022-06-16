const router = require('express').Router()
const {authServices} = require('../services/authServices')
const jwt = require('jsonwebtoken')
const {secret, cookieName} = require('../config/authConstants')


router.get('/login', (req, res) => {
    try{
        res.render('loginPage')
    }catch(err){
        res.render('404', {status:'404 - Page Not Found', message:`${err.message}`})
    }
})
router.post('/login', async (req, res) => {
    let responseData = await authServices.checkIfPasswordExist(req.body)
    console.log(responseData);
    if(typeof responseData == `string`){return res.render('404', {status:`401 - Unauthorized`, message:`${responseData}`})}

    if(responseData.isAuthenticated){
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
    else{
        return res.render('404', {status:`401 - Unauthorized`, message:`Password is incorrect!`})
    }
})

router.get('/register', (req, res) => {
    try{
        res.render('registerPage')
    }catch(err){
        res.render('404', {status:'404 - Page Not Found', message:`${err.message}`})
    }
    
})
router.post('/register', (req, res) => {
      authServices.checkIfUserExists(req.body.username)
      .then(async (result) => {
         if(!result){
            if(req.body.password !== req.body.repeatPassword){
                return res.render('404', {status: `401-Unauthorized`, message:`Passwords must match each other!`})
            }
            let user = await authServices.registerUser(req.body)
            let token = jwt.sign({username:user.username, _id: user._id}, secret, {expiresIn:'2d'})
            res.cookie(cookieName, token, {httpOnly:true})
            res.redirect('/')
         }
         else{
            res.render('404', {status: `401-Unauthorized`, message:`User already exists!`})
         }
      })
      .catch(err => res.render('404', {status:'500 - Internal Server Error', message:`${err.message}`}))
})

router.get('/logout', (req, res) => {
    res.clearCookie(cookieName)
    res.redirect('/')
})

router.get('/my-profile', (req, res) => {
    authServices.getUserWithCubes(req.user._id)
    .then((user) => {
        user.cubes.forEach(cube => {cube.isOwner = String(cube.owner) == String(user._id)});
        res.render('profile', {user})
    })
    .catch(err => res.render('404', {status: `500 - Internal Surver Error`, message : err.message}))
})

router.get('/profile/:userId', (req, res) => {
    authServices.getUserWithCubes(req.params.userId)
    .then((user) => res.render('profile', {user}))
    .catch(err => res.render('404', {status: `500 - Internal Surver Error`, message : err.message}))
})

module.exports = router