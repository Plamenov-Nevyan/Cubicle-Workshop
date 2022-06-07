const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator : function(){
                return /^https?$/.test(this.imageUrl)
            },
            message: props => `This image link is invalid`,
            required: [true, `Make sure the image link is correct !`]
        },
    },
    difficultyLevel: {
        required: true, 
        min: 1,
        max: 6
    },
    accesories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }]
})
const Cube = mongoose.model('Cube', cubeSchema)
exports.Cube = Cube