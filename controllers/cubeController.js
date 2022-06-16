const router = require('express').Router()
const {cubeServices} = require('../services/cubeServices')


router.get('/create', (req, res) => {
    try{
        res.render('create')
    }catch(err){
        res.render('404', {status:'404 - Page Not Found', message:`${err.message}`})
    }
})
router.post('/create', (req, res) => {
    req.body.owner = req.user._id
    cubeServices.saveCube(req.body)
    .then(resp => res.redirect('/'))
    .catch(err => res.render('404', {status:'400 - Bad Request', message:`${err.message}`}))
})

router.get('/details/:cubeId', (req, res) => {
    cubeServices.getCubeWithAccessories(req.params.cubeId)
    .then((cube) =>{
        if(req.user){cube.isOwner = cube.owner == req.user._id}
        res.render('details', {cube, user:req.user})}
        )
    .catch(err => res.render('404', {status:'404 - Page Not Found', message:`${err.message}`}))
})
router.post('/details/comment/:cubeId/:userId', (req, res) => {
    cubeServices.postComment(req.params.cubeId,req.params.userId, req.body)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(err => res.render('404', {status:`400 - Bad Request`, message: err.message}))
})

router.get('/edit/:cubeId', (req, res) =>{
   cubeServices.getSpecificCube(req.params.cubeId)
   .then((cube) => {
      let difLevelData = cubeServices.getDifficultyLevel(cube.difficultyLevel)
      let [cubeDifLevel, restDifLevels] = [difLevelData[0], difLevelData[1]]
      res.render('editCube',{cube, cubeDifLevel, restDifLevels})
   })
   .catch(err => res.render('404', {status:'404 - Page Not Found', message:`${err.message}`}))
})
router.post('/edit/:cubeId', (req, res) => {
    cubeServices.editCube(req.params.cubeId, req.body)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(err => res.render('404', {status:'400 - Bad Request', message:`${err.message}`}))
})

router.get('/delete/:cubeId', (req, res) => {
 cubeServices.getSpecificCube(req.params.cubeId)
 .then((cube) => res.render('deleteCubePage', {cube}))
 .catch(err => res.render('404', {status:'404 - Page Not Found', message:`${err.message}`}))
})
router.post('/delete/:cubeId', (req, res) => {
    cubeServices.deleteCube(req.params.cubeId)
    .then(() => res.redirect('/'))
    .catch(err => res.render('404', {status:'400 - Bad Request', message:`${err.message}`}))
})

module.exports = router