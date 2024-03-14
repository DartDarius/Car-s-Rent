const express = require('express')
const router = express.Router()

const { ValidationError } = require('../helpers/errorClass')
const { ERROR_MESSAGE, MESSAGE } = require('../helpers/constants')
const { isAuth } = require('../middlewares/middlewares')
const { validateAdmin } = require('../middlewares/validation')
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  updateParamCar,
  deleteCar,
  getAvailableCars,
} = require('../services/serviceCar')

router.get('/cars', async (req, res) => {
  try {
    const cars = await getAllCars()
    res.status(200).send(cars)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_REQUEST)
    res.status(400).send(ERROR_MESSAGE.ERROR_IN_REQUEST)
  }
})

router.get('/cars/:carId', async (req, res) => {
  const carId = req.params.carId
  try {
    const car = await getCarById(carId)
    res.status(200).send(car)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_REQUEST)
    res.status(400).send(ERROR_MESSAGE.ERROR_IN_REQUEST)
  }
})

router.get('/car', async (req, res) => {
  const { startDate, endDate } = req.query
  try {
    const result = await getAvailableCars(startDate, endDate)

    res.status(200).send(result)
    console.log(result)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_REQUEST)
    res.status(400).send(ERROR_MESSAGE.ERROR_IN_REQUEST)
  }
})

router.post('/cars', isAuth, async (req, res) => {
  const auth = req.headers.authorization
  try {
    const checkRole = await validateAdmin(auth)
    if (!checkRole) {
      throw new Error(ERROR_MESSAGE.ERROR_ACCESS)
    }
    const create = await createCar(req.body)
    res.status(201).send(create)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_ACCESS)
    res.status(406).send(ERROR_MESSAGE.ERROR_ACCESS)
  }
})

router.put('/cars/:carId', isAuth, async (req, res) => {
  const carId = req.params.carId
  const { brand, model, price } = req.body
  const newParams = { brand, model, price }
  const auth = req.headers.authorization
  try {
    const checkRole = await validateAdmin(auth)
    if (!checkRole) {
      throw new Error(ERROR_MESSAGE.ERROR_ACCESS)
    }
    const newCar = await updateCar(carId, newParams)
    res.status(200).send(newCar)
  } catch (error) {
    console.log(error.message)
    res.status(406).send(ERROR_MESSAGE.ERROR_ACCESS)
  }
})

router.patch('/cars/:carId', isAuth, async (req, res) => {
  const carId = req.params.carId
  const { rentStatus } = req.body
  const newParams = { rentStatus }
  const auth = req.headers.authorization
  try {
    const checkRole = await validateAdmin(auth)
    if (!checkRole) {
      throw new Error(ERROR_MESSAGE.ERROR_ACCESS)
    }
    const newCar = await updateParamCar(carId, newParams)
    res.status(200).send(newCar)
  } catch (error) {
    console.log(error.message)
    res.status(406).send(ERROR_MESSAGE.ERROR_ACCESS)
  }
})
router.delete('/cars/:carId', isAuth, async (req, res) => {
  const carId = req.params.carId
  const auth = req.headers.authorization
  try {
    const checkRole = await validateAdmin(auth)
    if (!checkRole) {
      throw new Error(ERROR_MESSAGE.ERROR_ACCESS)
    }
    await deleteCar(carId)
    res.status(200).send(MESSAGE.MESSAGE_DELETE)
  } catch (error) {
    console.log(error.message)
    res.status(406).send(ERROR_MESSAGE.ERROR_ACCESS)
  }
})

module.exports = router
