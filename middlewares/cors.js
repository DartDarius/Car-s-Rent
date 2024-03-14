function cors(req, res, next) {
  res.header(
    'Access-Control-Allow-Origin',
    'http://localhost:3000',
    'https://web.postman.co'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

module.exports = {
  cors,
}
