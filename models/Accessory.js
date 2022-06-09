const mongoose = require('mongoose')

const accesorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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
    description: {
        type: String,
        required: true,
        maxlength: 200
    },
    cubes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Cube'
    }]
})

const Accessory = mongoose.model('Accessory', accesorySchema)
exports.Accessory = Accessory
