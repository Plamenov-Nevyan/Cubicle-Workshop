const cubes = require('../config/database.json')

const getAllCubes = () => cubes

const getSpecificCube = (cubeId) => cubes.find(cube => cube.id == cubeId)

module.exports = {
    getAllCubes,
    getSpecificCube
}