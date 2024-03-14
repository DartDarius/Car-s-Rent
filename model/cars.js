const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
  brand: String,
  model: String,
  price: Number,
})

const Car = mongoose.model('Car', CarSchema)

module.exports = {
  Car,
}
