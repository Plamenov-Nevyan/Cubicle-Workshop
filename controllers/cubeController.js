const router = require('express').Router()
const {cubeServices} = require('../services/cubeServices')


router.get('/create', (req, res) => {
    res.render('create')
})
router.post('/create', (req, res) => {
    cubeServices.saveCube(req.body)
    .then(resp => res.redirect('/'))
    .catch(err => {throw new Error(err.message)})
})

router.get('/details/:cubeId', (req, res) => {
    cubeServices.getCubeWithAccessories(req.params.cubeId)
    .then((cube) =>{res.render('details', {cube})})
    .catch(err => {throw new Error(err.message)})
})

router.get('/edit/:cubeId', (req, res) =>{
   cubeServices.getSpecificCube(req.params.cubeId)
   .then((cube) => {
      let difLevelData = cubeServices.getDifficultyLevel(cube.difficultyLevel)
      let [cubeDifLevel, restDifLevels] = [difLevelData[0], difLevelData[1]]
      res.render('editCube',{cube, cubeDifLevel, restDifLevels})
   })
})
router.post('/edit/:cubeId', (req, res) => {
    cubeServices.editCube(req.params.cubeId, req.body)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(err => {throw new Error(err.message)})
})

module.exports = router