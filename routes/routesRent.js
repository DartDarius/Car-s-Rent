const express = require('express')
const router = express.Router()

const { ERROR_MESSAGE, MESSAGE } = require('../helpers/constants')
const {
  getRentById,
  createRent,
  deleteRent,
} = require('../services/serviceRent')
const { isAuth, validateUser } = require('../middlewares/middlewares')

router.get('/rents/:rentId', async (req, res) => {
  const rentId = req.params.rentId
  try {
    const rent = await getRentById(rentId)
    res.status(200).send(rent)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_PARAMS)
    res.status(400).send(ERROR_MESSAGE.ERROR_IN_PARAMS)
  }
})

// router.post('/rents', isAuth, validateUser, async (req, res) => {
//   try {
//     const create = await createRent(req.body)
//     res.status(201).send(create)
//     console.log(create)
//   } catch (error) {
//     console.log(ERROR_MESSAGE.ERROR_IN_PARAMS)
//     res.status(406).send(ERROR_MESSAGE.ERROR_IN_PARAMS)
//   }
// })

router.post('/rents/:carId', isAuth, validateUser, async (req, res) => {
  try {
    const create = await createRent(req.body)
    res.status(201).send(create)
    console.log(create)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_PARAMS)
    res.status(406).send(ERROR_MESSAGE.ERROR_IN_PARAMS)
  }
})

router.delete('/rents/:rentId', async (req, res) => {
  const rentId = req.params.rentId
  try {
    await deleteRent(rentId)
    res.status(200).send(MESSAGE.MESSAGE_DELETE)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_PARAMS)
    res.status(406).send(ERROR_MESSAGE.ERROR_IN_PARAMS)
  }
})

module.exports = router
