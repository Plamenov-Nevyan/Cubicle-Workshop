const {isAccessoryDescrValid, isAccessoryImageUrlValid, isAccessoryNameValid} = require('../utils/validators')

exports.accessoryMiddleware = (req, res, next) => {
    try{
        isAccessoryNameValid(req.body.name)
        isAccessoryDescrValid(req.body.description)
        isAccessoryImageUrlValid(req.body.imageUrl)
        next()
    }
    catch(error){
        res.locals.error = error.message
        return res.render('createAccessory')
    }
}