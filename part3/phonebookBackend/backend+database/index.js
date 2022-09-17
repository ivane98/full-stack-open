require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
//const person = require("./models/person");
app.use(express.static('build'))
app.use(cors())

app.use(express.json())
app.use(morgan('tiny'))

morgan.token('object', function (req, res) {
  return `${JSON.stringify(req.body)}`
})

app.use(morgan(':object'))

app.get('/api/persons', (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/info', (req, res, next) => {
  const date = new Date(Date.now())
  Person.countDocuments({})
    .then((count) => {
      let info = `<p>PhoneBook has info for ${count} people</p> <p>${date.toUTCString()} +0200 (Easter European Standart Time)</p>`
      res.send(info)
    })
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end()
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const person = {
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing',
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing',
    })
  }

  Person.find({}).then((persons) => {
    console.log('persons: ', persons)

    if (persons.some((person) => person.name === body.name)) {
      console.log('name must be unique')
      return response.status(400).json({
        error: 'name must be unique',
      })
    }

    let person = new Person({
      name: body.name,
      number: body.number,
    })

    person.save().then((savedPerson) => {
      console.log('savedPerson', savedPerson)
      response.json(savedPerson)
    })
  })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
