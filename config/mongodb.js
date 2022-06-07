const mongoose = require('mongoose')

const url = `mongodb://localhost:27017/cubicle-workshop`
exports.databaseInit = () => mongoose.connect(url)