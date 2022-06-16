const { User } = require('../models/User')
const { saltRounds, secret, cookieName } = require('../config/authConstants')
const processCountrySelect = require('../utils/processUserCountry')
const bcrypt = require('bcrypt')


const getUserWithCubes = (userId) => User.findById(userId).populate('cubes').lean()
const checkIfUserExists = async (username) => User.exists({username}).exec()

const registerUser = async (userData) => {
  let hashedPass = await bcrypt.hash(userData.password, saltRounds)
  return User.create({
    username:userData.username, 
    password: hashedPass,
    gender: userData.gender,
    country: processCountrySelect(userData.countrySelect)
})
}

const checkIfPasswordExist = async (userData) => {
    let user = await User.findOne({username: userData.username}).lean()
    if(user){
        let isAuthenticated = await bcrypt.compare(userData.password, user.password)
        return {
            user,
            isAuthenticated
        }
    } 
    else{
        return `User does not exist!`
    }
}


exports.authServices = {
    checkIfUserExists,
    checkIfPasswordExist,
    registerUser,
    getUserWithCubes
}