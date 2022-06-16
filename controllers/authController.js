const router = require('express').Router()

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

module.exports = router