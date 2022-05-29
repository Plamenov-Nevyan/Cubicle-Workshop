const router = require('express').Router()
const services = require('../services/cubeServices')

router.get('/', (req, res) => {
    let cubes = services.getAllCubes()
    res.render('index',{cubes})
   
})

router.get('/about', (req, res) => {
   res.render('about')
})

module.exports = router