const mongoose = require('mongoose')

const RentSchema = new mongoose.Schema({
  carId: { type: 'ObjectId', ref: 'Car' },
  userId: { type: 'ObjectId', ref: 'User' },
  startDate: Date,
  endDate: Date,
})

const Rent = mongoose.model('Rent', RentSchema)

module.exports = {
  Rent,
}
