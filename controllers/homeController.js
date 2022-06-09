const router = require('express').Router()
const {cubeServices} = require('../services/cubeServices')

router.get('/', (req, res) => {
    let searchValues 
    if(Object.values(req.query).length > 0){
        searchValues = {...req.query}
    }
    cubeServices.getAllCubes(searchValues)
    .then((cubes) => {res.render('index',{cubes})})
    .catch(err => {throw new Error(err.message)})
    
   
})

router.get('/about', (req, res) => {
   res.render('about')
})

module.exports = router