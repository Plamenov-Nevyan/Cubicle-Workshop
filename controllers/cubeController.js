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
    .then((cube) =>{ console.log(cube.accessories);res.render('details', {cube})})
    .catch(err => {throw new Error(err.message)})
})

module.exports = router