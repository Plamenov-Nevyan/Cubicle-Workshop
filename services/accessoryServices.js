const {Accessory} = require('../models/Accessory')
const {Cube} = require('../models/Cube')

const getAllAccessories = () => Accessory.find().lean()

const createAccessory = (data) => Accessory.create(data)

const getAllAvailableForCube = (attachedToCube) => Accessory.find({_id :{$nin:attachedToCube}}).lean()

const getOne = async (accessoryId) => Accessory.find({_id:accessoryId}).lean()

const saveAccessory = async (cubeId, accessoryId) => {
 let [cube, accessory] = await Promise.all([
   Cube.findById(cubeId),
   Accessory.findById(accessoryId)
 ])
 cube.accessories.push(accessory)
 accessory.cubes.push(cube)
  try{
    await cube.save()
    await accessory.save()
  }
  catch(err){
      throw err
  }
return cube
}

const removeAccessory = async(accessoryId, cubeId) => {
  let cube = await Cube.findById(cubeId)
  let indexOfAccessory = cube.accessories.indexOf(accessoryId)
  cube.accessories.splice(indexOfAccessory,1)
  await cube.save()
}

exports.accessoryServices = {
    getAllAccessories,
    createAccessory,
    getAllAvailableForCube,
    getOne,
    saveAccessory,
    removeAccessory
}