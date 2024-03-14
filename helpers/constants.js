const PORT = process.env.PORT
const URL = process.env.DB_CONNECTION_URL
const START_DATE = Date.now()

// const STATUS = {
//   TO_DO: 'to do',
//   DONE: 'done',
//   IN_PROGRESS: 'in progress',
// } переделать статусы под аренду

const ERROR_MESSAGE = {
  ERROR_IN_REQUEST: 'Error in request!',
  ERROR_OF_lENGTH: 'Error!Incorrect length',
  ERROR_INCORRECT_STATUS: 'Error!Status does not correct!',
  ERROR_IN_PARAMS: 'Error!Incorrect parameters!',
  ERROR_VALUE: 'Error! Incorrect value!',
  ERROR_ACCESS: 'Error! You do not have access to this action!',
  ERROR_IS_AUTH: 'Error!Auth is failed!',
  ERROR_NOT_AVAILABLE: 'Error! Car is not available!',
}

const MESSAGE = {
  MESSAGE_SECCUESS: 'Request was seccess!',
  MESSAGE_CHANGE: 'Change was success!',
  MESSAGE_DELETE: 'Delete was success!',
  MESSAGE_OF_FIELD: 'Required field!',
}

const USER_LENGTH = {
  MIN: 2,
  MAX: 15,
}

module.exports = {
  PORT,
  URL,
  START_DATE,
  ERROR_MESSAGE,
  USER_LENGTH,
  MESSAGE,
}
