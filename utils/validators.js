const bcrypt = require('bcrypt')
let usersRegex = /^[a-zA-Z0-9]+$/
let cubeRegex = /^[a-zA-Z0-9 ]+$/
let imageRegex = /^http/

exports.isUsernameValid = (usernameToCheck) => {
    let isValid = usersRegex.test(usernameToCheck)

    if(!isValid && usernameToCheck.length < 5 ){
        throw {
            message: 'Please enter a valid username that is atleast 5 characters long!'
        }
    }
    else if(!isValid){
        throw {
            message: 'Please enter a valid username!'
        }
    }
    else if(usernameToCheck.length < 5){
        throw {
            message : 'Username must be atleast 5 characters long!'
        }
    }
}

exports.isPasswordValid = (passToCheck, rePass) => {
   let isValid = usersRegex.test(passToCheck)

    if(!isValid){
            if(passToCheck.length < 8 && passToCheck !== rePass){
                throw {
                    message : 'Please enter valid password that is atleast 8 characters long and matches the repeat-password!'
                }
            }
            else if(passToCheck.length < 8){
                throw {
                    message : 'Please enter valid password that is atleast 8 characters long!'
                }
            }
            else if(passToCheck !== rePass){
                throw {
                    message : 'Please enter a valid password and repeat-password that match each-other!'
                }
            }
            else {
                throw {
                    message : 'Please enter a valid password!'
                }
            }
        }
   else if(passToCheck.length < 8 && passToCheck !== rePass){
        throw {
        message : 'Please enter valid password that is atleast 8 characters long and matches the repeat-password!'
        }
}
    else if(passToCheck.length < 8){
        throw {
            message : 'Please enter valid password that is atleast 8 characters long!'
        }
}
    else if(passToCheck !== rePass){
        throw {
            message : 'Please enter a valid password and repeat-password that match each-other!'
        }
}
}

exports.isCubeNameValid = (cubeNameToCheck) => {
   let isValid = cubeRegex.test(cubeNameToCheck)
   if(!isValid){
    if(cubeNameToCheck.length < 5){
        throw{
            message : 'Please enter a valid cube name that is atleast 5 characters long!'
        }
    }
    else {
        throw{
            message : 'Please enter a valid cube name, it must consist of only letters, digits and intervals!'
        }
    }
   }
   else if(cubeNameToCheck.length < 5){
    throw{
        message : 'Please enter a cube name that is atleast 5 characters long!'
    }
   }
}

exports.isDescriptionValid = (cubeDescrToCheck) => {
  let isValid = cubeRegex.test(cubeDescrToCheck)
  if(!isValid){
    if(cubeDescrToCheck.length < 20){
        throw{
            message: 'Please enter a valid description that is atleast 20 characters long!'
        }
    }
    else {
        throw{
            message: 'Please enter a valid description, it must consist of only letters, digits and intervals!'
        }
    }
  }
  else if(cubeDescrToCheck.length < 20){
    throw{
        message:'Please enter a description that is atleast 20 characters long!'
    }
  }
}

exports.isImageValid = (imageUrlToCheck) => {
    let isValid = imageRegex.test(imageUrlToCheck)
    if(!isValid){
        throw{
            message: 'Please enter a valid image URL!'
        }
    }
}

exports.isCommentValid = (comment) => {
    if(comment == ``){throw {message: 'You can\'t post an empty comment!'}}
}

exports.isAccessoryNameValid = (accessoryName) => {
    let isValid = cubeRegex.test(accessoryName)
    if(!isValid){
     if(accessoryName.length < 5){
         throw{
             message : 'Please enter a valid accessory name that is atleast 5 characters long!'
         }
     }
     else {
         throw{
             message : 'Please enter a valid accessory name, it must consist of only letters, digits and intervals!'
         }
     }
    }
    else if(accessoryName.length < 5){
     throw{
         message : 'Please enter a accessory name that is atleast 5 characters long!'
     }
    }
 }
 
 exports.isAccessoryDescrValid = (accessoryDescription) => {
    let isValid = cubeRegex.test(accessoryDescription)
    if(!isValid){
      if(accessoryDescription.length < 20){
          throw{
              message: 'Please enter a valid description that is atleast 20 characters long!'
          }
      }
      else {
          throw{
              message: 'Please enter a valid description, it must consist of only letters, digits and intervals!'
          }
      }
    }
    else if(accessoryDescription.length < 20){
      throw{
          message:'Please enter a description that is atleast 20 characters long!'
      }
    }
  }

  exports.isAccessoryImageUrlValid = (accessoryImageUrl) => {
    let isValid = imageRegex.test(accessoryImageUrl)
    if(!isValid){
        throw{
            message: 'Please enter a valid image URL!'
        }
    }
}