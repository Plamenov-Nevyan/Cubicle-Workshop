const router = require('express').Router()
const services = require('../services/cubeServices')

router.get('/create', (req, res) => {
    res.render('create')
})
router.post('/create', (req, res) => {
    services.saveCube(req.body)
    .then(resp => res.redirect('/'))
    .catch(err => {throw new Error(err.message)})
})

router.get('/details/:cubeId', (req, res) => {
    services.getSpecificCube(req.params.cubeId)
    .then((cube) =>res.render('details', {cube}))
    .catch(err => {throw new Error(err.message)})
})

module.exports = router