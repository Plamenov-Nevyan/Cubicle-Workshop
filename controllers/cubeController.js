const router = require('express').Router()
const services = require('../services/cubeServices')

router.get('/create', (req, res) => {
    res.render('create')
})
router.post('/create', (req, res) => {
    services.saveCube(req.body)
    .then(resp => res.redirect('/'))
})

router.get('/details/:cubeId', (req, res) => {
    let cube = services.getSpecificCube(req.params.cubeId)
    res.render('details', {cube})
})

module.exports = router