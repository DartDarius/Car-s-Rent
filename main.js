require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { PORT } = require('./helpers/constants')
const { mongoose } = require('./helpers/dbConnection')
const { cors } = require('./middlewares/cors')
const routesUser = require('./routes/routesUser')
const routesCar = require('./routes/routesCar')
const routesRent = require('./routes/routesRent')

module.exports = app

app.use(bodyParser.json())
app.use(cors)

app.use('/', routesUser)
app.use('/', routesCar)
app.use('/', routesRent)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
