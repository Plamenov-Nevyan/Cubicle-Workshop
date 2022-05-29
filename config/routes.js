const router = require('express').Router()
const homeController = require('../controllers/homeController')
const cubeController = require('../controllers/cubeController')
const notFoundController = require('../controllers/404Controller')

router.use('/', homeController)
router.use('/cube', cubeController)
router.use('*', notFoundController)

module.exports = router