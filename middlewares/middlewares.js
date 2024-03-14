const { getUserById } = require('../services/serviceUser')
const { ERROR_MESSAGE } = require('../helpers/constants')
const { getCarById } = require('../services/serviceCar')
const { StatusCodes, getReasonPhrase } = require('http-status-codes')

const isAuth = (req, res, next) => {
  const userId = req.headers.authorization
  const user = getUserById(userId)
  if (!user) {
    return res.status(401).send(ERROR_MESSAGE.ERROR_IS_AUTH)
  }
  next()
}

const validateUser = async (req, res, next) => {
  try {
    const userId = req.headers.authorization
    const user = await getUserById(userId)

    if (!user.isVerified) {
      return res.status(StatusCodes.FORBIDDEN).send({
        error: getReasonPhrase(StatusCodes.FORBIDDEN),
      })
    }
    return next()
  } catch (error) {
    console.log(error.message)
  }
}

// const validateCar = async (req, res, next) => {
//   try {
//     const carId = req.params.carId
//     const car = await getCarById(carId)
//     if (!car.rentStatus) {
//       return res.status(StatusCodes.FORBIDDEN).send({
//         error: getReasonPhrase(StatusCodes.FORBIDDEN),
//       })
//     }
//     return next()
//   } catch (error) {
//     console.log(error.message)
//   }
// }

module.exports = {
  isAuth,
  validateUser,
}
