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

router.get('/register', (req, res) => {
    try{
        res.render('registerPage')
    }catch(err){
        res.render('404', {status:'404 - Page Not Found', message:`${err.message}`})
    }
    
})
router.post('/register', (req, res) => {
      authServices.checkIfUserExists(req.body)
      .then(async(result) => {
         if(!result){
            if(req.body.password !== req.body.repeatPassword){
                return res.render('404', {status: `401-Unauthorized`, message:`Passwords must match each other!`})
            }
            let user = await authServices.registerUser(req.body)
            console.log(user);
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

module.exports = router