const router = require('express').Router()
const {cubeServices} = require('../services/cubeServices')
const {accessoryServices} = require('../services/accessoryServices')
const {accessoryMiddleware} = require('../middlewares/accessoryValidationMiddleware')

router.get('/attach/:cubeId', (req, res, next) => {
    cubeServices.getSpecificCube(req.params.cubeId)
    .then(async (cube) => {
       try{
          let accessories = await accessoryServices.getAllAvailableForCube(cube.accessories)
          res.render('attachAccessory', {cube, accessories})
       }catch(err){
          next(error)   
      }
    })
    .catch(error => next(error))
})
router.post('/attach/:cubeId',(req, res, next)=>{
    accessoryServices.saveAccessory(req.params.cubeId, req.body.accessory)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(error => next(error))
})

router.get('/add', (req, res, next) => {
    try{
        res.render('createAccessory')
    }catch(err){
        next(error)
    }  
})
router.post('/add', accessoryMiddleware, (req, res, next) => {
    accessoryServices.createAccessory(req.body)
    .then(() => res.redirect('/'))
    .catch(error => next(error))
})

router.get('/remove/:cubeId', (req, res, next) => {
   cubeServices.getCubeWithAccessories(req.params.cubeId)
   .then((cube) => res.render('removeAccessory', {cube}))
   .catch(error => next(error))
})
router.post('/remove/:cubeId', (req, res, next) =>{
    accessoryServices.removeAccessory(req.body.accessory, req.params.cubeId)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(error => next(error))
})

module.exports = router