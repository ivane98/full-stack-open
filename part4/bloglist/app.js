const express = require('express')
require('express-async-errors')
require('dotenv').config()
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleWare = require('./utils/middleware')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl)

app.use(middleWare.tokenExtractor)

app.use(cors())
app.use(express.json())

app.use('/', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
