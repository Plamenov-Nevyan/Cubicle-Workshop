const mongoose = require('mongoose')

const url = `mongodb://localhost:27017/catShelter`
module.exports = () => mongoose.connect(url)