const cubes = require('../config/database.json')
const path = require('path')
const fs = require('fs/promises')
const idGenerator = require('uniqid')

const getAllCubes = () => cubes

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