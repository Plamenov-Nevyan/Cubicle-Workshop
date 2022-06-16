const mongoose = require('mongoose')

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true,
        maxlength: 300
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator : function(){
                return /^http/.test(this.imageUrl)
            },
            message: props => `This image link is invalid`,
            required: [true, `Make sure the image link is correct !`]
        },
    },
    difficultyLevel: {
        type: Number,
        required: true, 
        min: 1,
        max: 6
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})
const Cube = mongoose.model('Cube', cubeSchema)
exports.Cube = Cube