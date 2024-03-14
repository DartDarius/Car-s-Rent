const { Car } = require('../model/cars')
const { Rent } = require('../model/rents')
const { ERROR_MESSAGE } = require('../helpers/constants')

const getAllCars = async () => {
  return Car.find()
}

const getCarById = async carId => {
  return Car.findById(carId)
}

const createCar = async ({ brand, model, price, rentStatus }) => {
  return await Car.create({ brand, model, price, rentStatus })
}

const updateCar = async (carId, newParams) => {
  return await Car.findByIdAndUpdate(carId, newParams)
}

const updateParamCar = async (carId, rentStatus) => {
  return await Car.findByIdAndUpdate(
    carId,
    {
      rentStatus,
    },
    { new: true }
  )
}

const deleteCar = async carId => {
  return await Car.findByIdAndDelete(carId)
}

const getAvailableCars = async (startDate, endDate) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  if (start > end) {
    throw new Error(ERROR_MESSAGE.ERROR_NOT_AVAILABLE)
  }
  const rentedCar = await Rent.distinct('carId', {
    startDate: { $lte: end },
    endDate: { $gte: start },
  })
  console.log(rentedCar)
  return await Car.find({
    _id: { $nin: rentedCar },
  })
}

module.exports = {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  updateParamCar,
  deleteCar,
  getAvailableCars,
}
