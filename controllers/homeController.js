const router = require('express').Router()
const services = require('../services/cubeServices')

router.get('/', (req, res) => {
    let searchValues 
    if(Object.values(req.query).length > 0){
        searchValues = {...req.query}
    }
    let cubes = services.getAllCubes(searchValues)
    res.render('index',{cubes})
   
})

router.get('/about', (req, res) => {
   res.render('about')
})

module.exports = router