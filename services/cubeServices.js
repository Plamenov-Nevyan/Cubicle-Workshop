let cubes = require('../config/database.json')
const path = require('path')
const fs = require('fs/promises')
const idGenerator = require('uniqid')

const getAllCubes = (searchValues) => {
    if(!searchValues){return cubes}
    else{
        let cubesForFilter = cubes.slice(0)
        if(searchValues.search){
            cubesForFilter = cubes.filter(cube => cube.name.toLowerCase().includes(searchValues.search.toLowerCase()))
         }
         else if(searchValues.from && searchValues.to){
             cubesForFilter = cubes
             .filter(cube => Number(cube.difficultyLevel) >= Number(searchValues.from))
             .filter(cube => Number(cube.difficultyLevel) <= Number(searchValues.to))

         }
         return cubesForFilter
      }
    }

const getSpecificCube = (cubeId) => cubes.find(cube => cube.id == cubeId)

const saveCube = (data) => {
    data.id = idGenerator()
    cubes.push(data)
   return fs.writeFile(
        path.resolve('config', 'database.json'), JSON.stringify(cubes, ``, 4), {encoding:'utf-8'})
}

module.exports = {
    getAllCubes,
    getSpecificCube,
    saveCube
}