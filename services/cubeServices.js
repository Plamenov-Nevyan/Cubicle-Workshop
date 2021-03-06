const { Cube } = require('../models/Cube')
const { User } = require('../models/User')
const { Comment } = require('../models/Comment')

const getAllCubes = (searchValues) => {
    if(!searchValues){
        return Cube.find().lean()
    }
    else{
        if(searchValues.search){
           try{
            return Cube.find({
                name: {$regex: new RegExp(searchValues.search, 'i')}
            }).lean()
           }
           catch(err){
            throw err
           }
         }
         else if(searchValues.from && searchValues.to){
            return Cube.find().where('difficultyLevel').gte(searchValues.from).lte(searchValues.to).lean()
         }
         else{return Cube.find().lean()
        }
      }
    }

const getSpecificCube = (cubeId) =>Cube.findById(cubeId).lean()

const getCubeWithAccessories = (cubeId) => {
    return Cube.findById(cubeId)
    .populate('accessories')
    .populate({
        path: 'comments',
        populate: {
            path : 'author',
            model: 'User'
        }
    })
    .lean()
}

const postComment = async (cubeId,userId, commentData) => {
    let [cube, newComment] = await Promise.all([
        Cube.findById(cubeId),
        Comment.create(commentData)
    ])
    newComment.author = userId
    cube.comments.push(newComment)
    await newComment.save()
    cube.save()
}


const saveCube = async (data) => {
    let [cube, user] = await Promise.all([
        Cube.create(data),
        User.findById(data.owner)
    ]) 
    user.cubes.push(cube)
    return user.save()
}

const getDifficultyLevel = (cubeDifLevel) => {  
const difficultyLevels = [    
    {text : '1 - Very Easy', value:1},
   {text: '2 - Easy', value:2},
   {text: '3 - Medium (Standard 3x3)', value:3},
    {text: '4 - Intermediate', value:4},
    {text:'5 - Expert', value:5},
   {text: '6 - Hardcore', value:6}
]
switch(cubeDifLevel){
    case 1 : return [difficultyLevels.splice(0,1)[0], difficultyLevels];
    case 2 : return [difficultyLevels.splice(1,1)[0], difficultyLevels];
    case 3 : return [difficultyLevels.splice(2,1)[0], difficultyLevels];
    case 4 : return [difficultyLevels.splice(3,1)[0], difficultyLevels];
    case 5 : return [difficultyLevels.splice(4,1)[0], difficultyLevels];
    case 6 : return [difficultyLevels.splice(5,1)[0], difficultyLevels];
}
}

const editCube = (cubeId, data) => Cube.findByIdAndUpdate({_id:cubeId}, data)

const deleteCube = (cubeId) => Cube.findByIdAndRemove(cubeId)

exports.cubeServices = {
    getAllCubes,
    getSpecificCube,
    saveCube,
    getCubeWithAccessories,
    getDifficultyLevel,
    editCube,
    deleteCube,
    postComment
}