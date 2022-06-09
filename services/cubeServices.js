const { Cube } = require('../models/Cube')

const getAllCubes = (searchValues) => {
    if(!searchValues){
        return Cube.find().lean()
    }
    else{
        if(searchValues.search){
            return cubesForFilter = Cube.find({
                name: {$regex: new RegExp(searchValues.search, 'i')}
            }).lean()
         }
         else if(searchValues.from && searchValues.to){
            return Cube.find().where('difficultyLevel').gte(searchValues.from).lte(searchValues.to).lean()
         }
         else{return Cube.find().lean()
        }
      }
    }

const getSpecificCube = (cubeId) =>Cube.findById(cubeId).lean()

const getCubeWithAccessories = (cubeId) => Cube.findById(cubeId).populate('accessories').lean()

const saveCube = (data) => Cube.create(data)


exports.cubeServices = {
    getAllCubes,
    getSpecificCube,
    saveCube,
    getCubeWithAccessories
}