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
    // else{
    //     let cubesForFilter = cubes.slice(0)
    //     if(searchValues.search){
    //         cubesForFilter = cubes.filter(cube => cube.name.toLowerCase().includes(searchValues.search.toLowerCase()))
    //      }
    //      else if(searchValues.from && searchValues.to){
    //          cubesForFilter = cubes
    //          .filter(cube => Number(cube.difficultyLevel) >= Number(searchValues.from))
    //          .filter(cube => Number(cube.difficultyLevel) <= Number(searchValues.to))

    //      }
    //      return cubesForFilter
    //   }
    }

const getSpecificCube = (cubeId) => Cube.findOne({_id:cubeId}).lean()

const saveCube = (data) => Cube.create(data)


module.exports = {
    getAllCubes,
    getSpecificCube,
    saveCube
}