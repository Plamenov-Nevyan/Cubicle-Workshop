const router = require('express').Router()
const {cubeServices} = require('../services/cubeServices')
const {accessoryServices} = require('../services/accessoryServices')

router.get('/attach/:cubeId', (req, res) => {
    cubeServices.getSpecificCube(req.params.cubeId)
    .then(async (cube) => {
       try{
          let accessories = await accessoryServices.getAllAvailableForCube(cube.accessories)
          res.render('attachAccessory', {cube, accessories})
       }catch(err){
         throw new Error(err.message)    
      }
    })
    .catch(err => {throw new Error(err.message)})
})
router.post('/attach/:cubeId',(req, res)=>{
    accessoryServices.saveAccessory(req.params.cubeId, req.body.accessory)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(err => {throw new Error(err.message)})
})

router.get('/add', (req, res) => {
    res.render('createAccessory')
})
router.post('/add', (req, res) => {
    accessoryServices.createAccessory(req.body)
    .then(() => res.redirect('/'))
    .catch(err => {throw new Error(err.message)})
})

router.get('/remove/:cubeId', (req, res) => {
   cubeServices.getCubeWithAccessories(req.params.cubeId)
   .then((cube) => res.render('removeAccessory', {cube}))
   .catch(err => {throw new Error(err.message)}) 
})
router.post('/remove/:cubeId', (req, res) =>{
    accessoryServices.removeAccessory(req.body.accessory, req.params.cubeId)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(err => {throw new Error(err.message)})
})

module.exports = router