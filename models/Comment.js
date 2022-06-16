const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
     author:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
     },
     content:{
        type:String,
        required:true,
        minlength:5
     }
})

const Comment = mongoose.model('Comment', commentSchema)
exports.Comment = Comment