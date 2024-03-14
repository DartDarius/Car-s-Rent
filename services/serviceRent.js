const { Rent } = require('../model/rents')
// История аренды: (CRD)

const getRentById = async rentId => {
  return Rent.findById(rentId).populate('carId').populate('userId')
}

const createRent = async ({
  userId,
  carId,
  startDate,
  endDate,
  canceletionDate,
}) => {
  return Rent.create({
    userId,
    carId,
    startDate,
    endDate,
    canceletionDate,
  })
}

const deleteRent = async rentId => {
  return Rent.findByIdAndDelete(rentId)
}

module.exports = {
  getRentById,
  createRent,
  deleteRent,
}
