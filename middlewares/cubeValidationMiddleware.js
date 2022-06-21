const {isCubeNameValid, isDescriptionValid, isImageValid, isCommentValid} = require('../utils/validators')

exports.createMiddleware = (req, res, next) => {
    try{
        isCubeNameValid(req.body.name)
        isDescriptionValid(req.body.description)
        isImageValid(req.body.imageUrl)
        next()
    }
    catch(error){
        res.locals.error = error.message
        return res.render('create')
    }
}

exports.editMiddleware = (req, res, next) => {
    try{
        isCubeNameValid(req.body.name)
        isDescriptionValid(req.body.description)
        isImageValid(req.body.imageUrl)
    }
    catch(error){
        res.locals.error = error.message
    }
    next()
}

exports.commentMiddleware = (req, res, next) => {
    try{
        isCommentValid(req.body.content)
    }
    catch(error){
        res.locals.error = error.message
    }
    next()
}