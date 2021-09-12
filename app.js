const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const fs = require('fs')

const HttpError = require('./models/http-error')
const userRoute = require('./routes/users-route')

const app = express()

app.use(express.json())

app.use(cors())

app.use('/uploads/images', express.static(path.join('uploads', 'join')))

app.use('/api/users', userRoute)
// app.use('/api/products')

app.use((req, res, next) => {
  const error = new HttpError({
    message: 'could not find this route',
    code: 404,
  })
  throw error
})

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => console.log(err))
  }
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({
    message: error.message || 'unknown error occured',
  })
})

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@develop.a5v0e.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(({ connection }) => {
    app.listen(5000)
    console.log('mongodb connected: ', connection.host)
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
