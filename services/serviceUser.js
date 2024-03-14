const { User } = require('../model/users')
const { ValidationError } = require('../helpers/errorClass')
const { USER_LENGTH, ERROR_MESSAGE } = require('../helpers/constants')

const getAllUsers = async () => {
  return User.find()
}

const getUserById = async userId => {
  return User.findById(userId)
}

const createUser = async ({
  username,
  email,
  roles,
  isVerified,
  activeRents,
}) => {
  if (username.lengt < USER_LENGTH.MIN || username.length > USER_LENGTH.MAX) {
    throw new ValidationError(ERROR_MESSAGE.ERROR_OF_lENGTH)
  }
  return await User.create({
    username,
    email,
    roles,
    isVerified: false,
    activeRents,
  })
}

const updateUser = async (userId, newRecords) => {
  return await User.findByIdAndUpdate(userId, newRecords)
}

const updateVerifiedForUser = async (userId, isVerified) => {
  return await User.findByIdAndUpdate(
    userId,
    { isVerified: isVerified },
    { new: true }
  )
}

const deleteUserById = async userId => {
  return await User.findByIdAndDelete(userId)
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateVerifiedForUser,
  deleteUserById,
}
