const express = require('express')
const router = express.Router()

const { ValidationError } = require('../helpers/errorClass')
const { validationResult } = require('express-validator')
const { ERROR_MESSAGE, MESSAGE } = require('../helpers/constants')
const { isAuth } = require('../middlewares/middlewares')
const { validateAdmin } = require('../middlewares/validation')
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateVerifiedForUser,
  deleteUserById,
} = require('../services/serviceUser')

router.get('/users', async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).send(users)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_REQUEST)
    res.status(406).send(ERROR_MESSAGE.ERROR_IN_REQUEST)
  }
})

router.get('/user', async (req, res) => {
  const userId = req.headers.authorization
  try {
    const user = await getUserById(userId)
    res.status(200).send(user)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_REQUEST)
    res.status(406).send(ERROR_MESSAGE.ERROR_IN_REQUEST)
  }
})

router.post('/user', async (req, res) => {
  try {
    const create = await createUser(req.body)
    res.status(201).send(create)
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(406).send(ERROR_MESSAGE.ERROR_IN_PARAMS)
    }
  }
})

router.put('/user', async (req, res) => {
  const userId = req.headers.authorization
  const { username, email, roles, isVerified, activeRents } = req.body
  const newRecords = { username, email, roles, isVerified, activeRents }
  try {
    await updateUser(userId, newRecords)
    res.status(200).send(MESSAGE.MESSAGE_CHANGE)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_PARAMS)
    res.status(400).send(ERROR_MESSAGE.ERROR_IN_PARAMS)
  }
})

router.delete('/user', async (req, res) => {
  const userId = req.headers.authorization
  try {
    const deleteUser = await deleteUserById(userId)
    res.status(200).send(deleteUser)
  } catch (error) {
    console.log(ERROR_MESSAGE.ERROR_IN_REQUEST)
    res.status(406).send(ERROR_MESSAGE.ERROR_IN_REQUEST)
  }
})

router.patch(
  '/user/:userId/isVerified/:isVerified',
  isAuth,
  async (req, res) => {
    const userId = req.params.userId
    const isVerified = req.params.isVerified
    const auth = req.headers.authorization
    try {
      const checkRole = await validateAdmin(auth)
      if (!checkRole) {
        throw new Error(ERROR_MESSAGE.ERROR_ACCESS)
      }
      await updateVerifiedForUser(userId, isVerified)
      res.status(200).send(MESSAGE.MESSAGE_CHANGE)
    } catch (error) {
      console.log(ERROR_MESSAGE.ERROR_IN_PARAMS)
      res.status(406).send(ERROR_MESSAGE.ERROR_IN_PARAMS)
    }
  }
)

// router.patch('/user/isVerified/:isVerified', async (req, res) => {
//   const userId = req.headers.authorization
//   const isVerified = req.params.isVerified
//   try {
//     await updateVerifiedForUser(userId, isVerified)
//     res.status(200).send(MESSAGE.MESSAGE_CHANGE)
//   } catch (error) {
//     console.log(ERROR_MESSAGE.ERROR_IN_PARAMS)
//     res.status(406).send(ERROR_MESSAGE.ERROR_IN_PARAMS)
//   }
// })

module.exports = router
