const router = require('express').Router()
const homeController = require('../controllers/homeController')
const cubeController = require('../controllers/cubeController')
const notFoundController = require('../controllers/404Controller')
const accessoryController = require('../controllers/accessoryController')

router.use('/', homeController)
router.use('/cube', cubeController)
router.use('/accessory', accessoryController)
router.use('*', notFoundController)

module.exports = router