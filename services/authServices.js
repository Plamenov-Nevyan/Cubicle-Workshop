const { User } = require('../models/User')
const { saltRounds, secret, cookieName } = require('../config/authConstants')
const {promisify} = require('util')
const bcrypt = require('bcrypt')


const checkIfUserExists = async (userData) => User.exists({username:userData.username}).exec()

const registerUser = async (userData) => {
  let hashedPass = await bcrypt.hash(userData.password, saltRounds)
  return User.create({username:userData.username, password: hashedPass})
}


exports.authServices = {
    checkIfUserExists,
    registerUser
}