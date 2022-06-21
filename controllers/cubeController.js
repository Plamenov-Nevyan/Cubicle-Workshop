const router = require('express').Router()
const {cubeServices} = require('../services/cubeServices')
const {createMiddleware, editMiddleware, commentMiddleware} = require('../middlewares/cubeValidationMiddleware')


router.get('/create', (req, res, next) => {
    try{
        res.render('create')
    }catch(error){
        next(error)
    }
})
router.post('/create', createMiddleware, (req, res, next) => {
    req.body.owner = req.user._id
    cubeServices.saveCube(req.body)
    .then(() => res.redirect('/'))
    .catch(error => next(error))
})

router.get('/details/:cubeId', (req, res, next) => {
    cubeServices.getCubeWithAccessories(req.params.cubeId)
    .then((cube) =>{
        if(req.user){cube.isOwner = cube.owner == req.user._id}
        res.render('details', {cube, user:req.user})}
        )
    .catch(error => next(error) )
})
router.post('/details/comment/:cubeId/:userId', commentMiddleware, (req, res, next) => {
 if(res.locals.error){
    cubeServices.getCubeWithAccessories(req.params.cubeId)
    .then((cube) =>{
        if(req.user){cube.isOwner = cube.owner == req.user._id}
        res.render('details', {cube, user:req.user})}
        )
    .catch(error => next(error))
 }
 else{
    cubeServices.postComment(req.params.cubeId,req.params.userId, req.body)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(error => next(error))
 }
})

router.get('/edit/:cubeId', (req, res, next) =>{
   cubeServices.getSpecificCube(req.params.cubeId)
   .then((cube) => {
      let difLevelData = cubeServices.getDifficultyLevel(cube.difficultyLevel)
      let [cubeDifLevel, restDifLevels] = [difLevelData[0], difLevelData[1]]
      res.render('editCube',{cube, cubeDifLevel, restDifLevels})
   })
   .catch(error => next(error))
})
router.post('/edit/:cubeId', editMiddleware, (req, res, next) => {
   if(res.locals.error){
    cubeServices.getSpecificCube(req.params.cubeId)
    .then((cube) => {
        let [cubeDifLevel, restDifLevels] = cubeServices.getDifficultyLevel(cube.difficultyLevel)
        return res.render(`editCube`, {cube,cubeDifLevel, restDifLevels})
    })
    .catch(error => next(error))
   }
   else{
    cubeServices.editCube(req.params.cubeId, req.body)
    .then(() => res.redirect(`/cube/details/${req.params.cubeId}`))
    .catch(error => next(error))
   }
})

router.get('/delete/:cubeId', (req, res, next) => {
 cubeServices.getSpecificCube(req.params.cubeId)
 .then((cube) => {
    let [cubeDifLevel, _] = cubeServices.getDifficultyLevel(cube.difficultyLevel)
    res.render('deleteCubePage', {cube, cubeDifLevel})
})
.catch(error => next(error))
})
router.post('/delete/:cubeId', (req, res,next) => {
    cubeServices.deleteCube(req.params.cubeId)
    .then(() => res.redirect('/'))
    .catch(error => next(error))
})

module.exports = router