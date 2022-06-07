let cubes = require('../config/database.json')
const { Cube } = require('../models/Cube')
const { Accesory } = require('../models/Accesory')
const path = require('path')
const fs = require('fs/promises')
const idGenerator = require('uniqid')

const getAllCubes = (searchValues) => {
    if(!searchValues){
        return Cube.find().lean()
    }
    else{
        let cubesForFilter 
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

const getSpecificCube = (cubeId) => Cube.findOne({_id:cubeId}).lean()

const saveCube = (data) => Cube.create(data)


module.exports = {
    getAllCubes,
    getSpecificCube,
    saveCube
}