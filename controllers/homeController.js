const router = require('express').Router()
const {cubeServices} = require('../services/cubeServices')

router.get('/', (req, res, next) => {
    let searchValues 
    if(Object.values(req.query).length > 0){
        searchValues = {...req.query}
    }
    cubeServices.getAllCubes(searchValues)
    .then((cubes) => {
        if(req.user){cubes.forEach(cube => cube.isOwner = cube.owner == req.user._id)}
        res.render('index',{cubes})
    })
    .catch(error => next(error))
})

router.get('/about', (req, res,next) => {
  try{ res.render('about')
}catch(err){
    next(error)
}
})

module.exports = router