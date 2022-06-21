const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        unique:true,
        required: true
    },
    password: {
          type: String,
          required: true
    },
    gender: {
      type: String,
      required: true
    },
    country: {
        type: String,
    },
    imageUrl: {
        type: String
    },
    cubes : [{
        type: mongoose.Types.ObjectId,
        ref: 'Cube' 
    }]

})

const User = mongoose.model('User', userSchema)
exports.User = User