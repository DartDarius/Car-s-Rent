const { body, param } = require('express-validator')
const { ERROR_MESSAGE, MESSAGE } = require('../helpers/constants')
const { getUserById } = require('../services/serviceUser')

const validateId = id =>
  param(id)
    .isMongoId()
    .withMessage(`${id} ${ERROR_MESSAGE.ERROR_VALUE}`)
    .escape()

//  ----------------- validation for User ----------------

const validateUsername = name =>
  body(name)
    .trim()
    .isString()
    .notEmpty()
    .withMessage(`${name} ${MESSAGE.MESSAGE_OF_FIELD}`)
    .isLength({ min: 2, max: 15 })
    .withMessage(ERROR_MESSAGE.ERROR_OF_lENGTH)
    .escape()

const validateEmail = () => body('email').trim().isInt().escape()

// ---------------------- validation for Car -------------------

const validateAdmin = async userId => {
  try {
    const user = await getUserById(userId)
    if (!user.roles.includes('admin')) {
      return false
    }
    return true
  } catch (error) {
    console.log(error.message)
  }
}

// ------------------- validation for Rent ----------------------

module.exports = {
  validateId,
  validateUsername,
  validateEmail,
  validateAdmin,
}
